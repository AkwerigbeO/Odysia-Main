const Project = require('../models/Project');
const User = require('../models/User');
const Message = require('../models/Message');
const { createNotification } = require('./notificationController');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Private
const getProjects = async (req, res, next) => {
    try {
        let query = {};

        // If user is client, show their projects
        // If user is expert, show projects where they are assigned
        if (req.user.role === 'client') {
            query = { client: req.user._id };
        } else if (req.user.role === 'expert') {
            query = { expert: req.user._id };
        } else if (req.user.role === 'admin') {
            // Admin sees all, or can filter
        }

        const projects = await Project.find(query)
            .populate('client', 'name email')
            .populate('expert', 'name email')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: projects.length,
            data: projects
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Create new project
// @route   POST /api/projects
// @access  Private
const createProject = async (req, res, next) => {
    try {
        const { title, description, budget, status, startDate, completionDate, expert } = req.body;

        const project = await Project.create({
            client: req.user.id,
            title,
            description,
            budget,
            status,
            startDate,
            completionDate,
            expert
        });

        // Notify Expert if assigned
        if (expert) {
            await createNotification(
                expert,
                'project',
                'New Project Assignment',
                `You have been assigned to the project: ${title}`,
                project._id
            );
        }

        res.status(201).json(project);
    } catch (error) {
        next(error);
    }
};

// @desc    Get dashboard stats
// @route   GET /api/projects/stats
// @access  Private
const getProjectStats = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const projects = await Project.find({ client: userId });

        const totalProjects = projects.length;
        const inProgress = projects.filter(p => p.status === 'active').length;
        const completed = projects.filter(p => p.status === 'completed').length;

        let totalSpent = 0;
        projects.forEach(p => {
            totalSpent += (p.spent || 0);
        });

        // Also fetch user stats for completeness (rating, etc)
        const user = await User.findById(userId);

        // Calculate Active Chats dynamically
        // Using distinct senders who have messaged this user
        const distinctSenders = await Message.distinct('sender', { recipient: userId });
        const activeChats = distinctSenders.length;

        // Pending Actions: Count milestones waiting for review (for client) 
        // or other items depending on user role check if needed. 
        // For simplicity, we count 'pending_review' milestones in projects owned by this user.
        let pendingActions = 0;
        const pendingReviewProjects = await Project.find({
            client: userId,
            'milestones.status': 'pending_review'
        });

        // Sum up exact milestones if needed, or just count projects. 
        // Let's count actual milestones for accuracy.
        pendingReviewProjects.forEach(proj => {
            const pending = proj.milestones.filter(m => m.status === 'pending_review').length;
            pendingActions += pending;
        });

        res.status(200).json({
            totalProjects,
            inProgress,
            completed,
            totalSpent,
            rating: user.rating || 0,
            activeChats,
            pendingActions
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Submit files to a milestone
// @route   POST /api/projects/:projectId/milestones/:milestoneId/submit
// @access  Private (Expert only)
const submitDeliverable = async (req, res, next) => {
    try {
        const { projectId, milestoneId } = req.params;
        const { files } = req.body; // Expecting array of { originalName, fileId, mimeType }

        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ success: false, error: 'Project not found' });
        }

        // Check if user is the assigned expert
        if (project.expert.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ success: false, error: 'Not authorized to submit for this project' });
        }

        const milestone = project.milestones.id(milestoneId);
        if (!milestone) {
            return res.status(404).json({ success: false, error: 'Milestone not found' });
        }

        // Add files to milestone
        milestone.files = milestone.files.concat(files);
        milestone.status = 'pending_review'; // Mark as pending review for client approval

        await project.save();

        // Notify Client
        await createNotification(
            project.client,
            'project',
            'Milestone Deliverables',
            `Deliverables submitted for milestone: ${milestone.title}`,
            project._id
        );

        res.status(200).json({
            success: true,
            data: project
        });
    } catch (error) {
        next(error);
    }
};



// @desc    Get single project by ID
// @route   GET /api/projects/:id
// @access  Private
const getProjectById = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id)
            .populate('client', 'name email avatar')
            .populate('expert', 'name email avatar')
            .populate('milestones.files'); // Populate files if they are refs, though schema might just have them as objects

        if (!project) {
            return res.status(404).json({ success: false, error: 'Project not found' });
        }

        // Access check
        if (project.client._id.toString() !== req.user.id &&
            (project.expert && project.expert._id.toString() !== req.user.id) &&
            req.user.role !== 'admin') {
            return res.status(403).json({ success: false, error: 'Not authorized to view this project' });
        }

        res.status(200).json({
            success: true,
            data: project
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update project details
// @route   PUT /api/projects/:id
// @access  Private (Client/Admin only)
const updateProject = async (req, res, next) => {
    try {
        let project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ success: false, error: 'Project not found' });
        }

        // Access check
        if (project.client.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ success: false, error: 'Not authorized to update this project' });
        }

        // Prevent updates if project is already completed or cancelled
        if (['completed', 'cancelled'].includes(project.status) && req.user.role !== 'admin') {
            return res.status(400).json({ success: false, error: 'Cannot update project in this status' });
        }

        // fields to update
        const { title, description, budget, status, completionDate } = req.body;

        // simple update
        if (title) project.title = title;
        if (description) project.description = description;
        if (budget) project.budget = budget;
        if (status) project.status = status;
        if (completionDate) project.completionDate = completionDate;

        await project.save();

        res.status(200).json({
            success: true,
            data: project
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Add a milestone to project
// @route   POST /api/projects/:id/milestones
// @access  Private (Client/Admin only)
const addMilestone = async (req, res, next) => {
    try {
        const { title, description, amount, dueDate } = req.body;
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ success: false, error: 'Project not found' });
        }

        // Access check
        if (project.client.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ success: false, error: 'Not authorized' });
        }

        // Add milestone
        project.milestones.push({
            title,
            description,
            amount: amount || 0,
            dueDate,
            status: 'pending' // default
        });

        await project.save();

        // Notify expert if exists
        if (project.expert) {
            await createNotification(
                project.expert,
                'project',
                'New Milestone Added',
                `A new milestone "${title}" has been added to project: ${project.title}`,
                project._id
            );
        }

        res.status(200).json({
            success: true,
            data: project
        });

    } catch (error) {
        next(error);
    }
};

// @desc    Update milestone status (Approve/Reject)
// @route   PUT /api/projects/:id/milestones/:milestoneId
// @access  Private
const updateMilestoneStatus = async (req, res, next) => {
    try {
        const { status, remarks } = req.body; // status: 'approved', 'rejected'
        const { id, milestoneId } = req.params;

        const project = await Project.findById(id);
        if (!project) {
            return res.status(404).json({ success: false, error: 'Project not found' });
        }

        const milestone = project.milestones.id(milestoneId);
        if (!milestone) {
            return res.status(404).json({ success: false, error: 'Milestone not found' });
        }

        // Authorization Logic
        // Client can Approve/Reject.
        // Expert can theoretically mark as 'submitted'? (already handled in submitDeliverable)
        // Let's assume this endpoint is mainly for CLIENT approval/rejection.
        if (project.client.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ success: false, error: 'Not authorized to approve/reject' });
        }

        // Update status
        if (['approved', 'rejected', 'active'].includes(status)) {
            milestone.status = status;
        }

        // If approved
        if (status === 'approved') {
            // Logic to release fund would go here (Phase 2)
            // For now, we just mark it.
            // Notify Expert
            if (project.expert) {
                await createNotification(
                    project.expert,
                    'payment',
                    'Milestone Approved',
                    `Milestone "${milestone.title}" has been approved! Funds released.`,
                    project._id
                );
            }
        }
        // If rejected
        else if (status === 'rejected') {
            // Notify Expert
            if (project.expert) {
                await createNotification(
                    project.expert,
                    'project',
                    'Milestone Rejected',
                    `Action Required: Milestone "${milestone.title}" was rejected. Remarks: ${remarks || 'No remarks'}`,
                    project._id
                );
            }
        }

        await project.save();

        res.status(200).json({
            success: true,
            data: project
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    getProjects,
    createProject,
    getProjectStats,
    submitDeliverable,
    getProjectById,
    updateProject,
    addMilestone,
    updateMilestoneStatus
};
