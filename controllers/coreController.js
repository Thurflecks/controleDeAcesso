const AdminModel = require('../models/adminModel');
const bcrypt = require('bcrypt');

module.exports = class CoreController {
    static async home(req, res) {
        try {
            res.render("home");
        } catch (error) {
            req.flash('error', 'Erro ao carregar a página inicial.');
            console.log(error)
            res.status(500).redirect("/login");
        }
    }
    static async login(req, res) {
        try {
            res.render("login");
        } catch (error) {
            req.flash('error', 'Erro ao carregar a página de login.');
            res.status(500).redirect("/");
        }
    }
    static async loginPost(req, res) {
        try {
            const { email, senha } = req.body;
            const admin = await AdminModel.findOne({ where: { email: email } });

            if (!admin) {
                req.flash('error', 'email ou senha incorretos!');
                return res.status(401).redirect('/login');
            }

            const senhaCorreta = await bcrypt.compare(senha, admin.senha);

            if (!senhaCorreta) {
                req.flash('error', 'email ou senha incorretos!');
                return res.status(401).redirect('/login');
            }

            req.session.user = {
                id: admin.id,
                email: admin.email,
                nivel: admin.nivel,
                nome: admin.nome
            };

            req.flash('success', 'Login realizado com sucesso!');
            res.redirect("/");
        } catch (error) {
            console.log(error, 'erro ao realizar o login');
            req.flash('message', 'Erro ao realizar o login!');
            res.status(500).redirect('/login');
        }
    }

    static async register(req, res) {
        try {
            res.render("register");
        } catch (error) {
            req.flash('error', 'Erro ao carregar a página de registro.');
            res.status(500).redirect("/");
        }
    }

    static async registerPost(req, res) {
        try {
            const { nome, email, senha, nivel } = req.body;
            const salt = await bcrypt.genSalt(10);
            const senhaHash = await bcrypt.hash(senha, salt);

            await AdminModel.create({ nome, email, senha: senhaHash, nivel });

            req.flash('success', 'Administrador cadastrado com sucesso!');
            res.redirect("/login");
        } catch (error) {
            console.log(error, 'erro ao registrar');
            req.flash('message', 'Erro ao registrar!');
            res.status(500).redirect('/register');
        }
    }
    static async acesso(req, res) {
        try {
            res.render("home");
        } catch (error) {
            req.flash('error', 'Erro ao carregar a página de acesso.');
            res.status(500).redirect("/");
        }
    }
}