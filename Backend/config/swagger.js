const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'JobAggregator API',
            version: '1.0.0',
            description: 'DevJobs - Job board backend API with authentication and job offer management',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Local development server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        name: { type: 'string', example: 'Doe' },
                        firstname: { type: 'string', example: 'John' },
                        email: { type: 'string', example: 'john@example.com' },
                        role: { type: 'string', enum: ['User', 'Recruiter', 'admin'] },
                        created_at: { type: 'string', format: 'date-time' },
                    },
                },
                Job: {
                    type: 'object',
                    properties: {
                        id: { type: 'string', example: 'job-001' },
                        company_id: { type: 'string', example: 'comp-001' },
                        title: { type: 'string', example: 'Senior Fullstack Developer' },
                        description: { type: 'string' },
                        salary_min: { type: 'integer', example: 50000 },
                        salary_max: { type: 'integer', example: 70000 },
                        currency: { type: 'string', example: 'EUR' },
                        experience_years: { type: 'integer', example: 5 },
                        remote_type: { type: 'string', example: 'hybrid' },
                        location: { type: 'string', example: 'Paris, France' },
                        skills: { type: 'string', example: '["JavaScript","React"]' },
                        created_at: { type: 'string', format: 'date-time' },
                    },
                },
                Error: {
                    type: 'object',
                    properties: {
                        success: { type: 'boolean', example: false },
                        message: { type: 'string' },
                    },
                },
            },
        },
    },
    apis: ['./routes/*.js', './controllers/*.js', './server.js'],
};

const specs = swaggerJsdoc(options);
module.exports = specs;
