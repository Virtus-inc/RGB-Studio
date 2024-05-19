class authController {
    async registration(req, res) {
        try {

        } catch(e) {
            console.error(e);
            res.status(500).json({ e: 'Internal server error' });
        }
    };
    async login(req, res) {
        try {
            res.json('server work');
        } catch(e) {
            console.error(e);
            res.status(500).json({ e: 'Internal server error' });
        }
    };
}

module.exports = new authController();