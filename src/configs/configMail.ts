export = {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    service: "gmail",
    secure: false,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
    default: {
        from: "<noreply@teste.com>",
    },
};
