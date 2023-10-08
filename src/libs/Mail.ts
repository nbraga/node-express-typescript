import { create } from "express-handlebars";
import nodemailer, { TransportOptions } from "nodemailer";
import nodemailerExpressHandlebars from "nodemailer-express-handlebars";
import { resolve } from "path";
import configMail from "src/configs/configMail";

class Mail {
    private transporter: nodemailer.Transporter;

    constructor() {
        const { host, port, secure, auth, service } = configMail;

        this.transporter = nodemailer.createTransport({
            host,
            service,
            port,
            secure,
            auth,
        } as TransportOptions);

        this.configureTemplates();
    }

    configureTemplates() {
        const viewPath = resolve(__dirname, "..", "app", "views", "emails");

        const handlebarsOptions = {
            viewEngine: create({
                extname: ".hbs",
                layoutsDir: resolve(viewPath, "layouts"),
                partialsDir: resolve(viewPath, "partials"),
                defaultLayout: "default",
            }),
            viewPath,
            extName: ".hbs",
        };

        this.transporter.use(
            "compile",
            nodemailerExpressHandlebars(handlebarsOptions)
        );
    }

    sendMail(message: {}) {
        return this.transporter.sendMail({
            ...configMail.default,
            ...message,
        });
    }
}

export default new Mail();
