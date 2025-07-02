
import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/", async (req, res) => {
    const { name, email, phone, message } = req.body;
    
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "vaishukathir17@gmail.com", 
            pass: "pmwvuixwihxajtfa",     
        },
    });
    
    const mailOptions = {
        from: email,
        to: "vaishukathir17@gmail.com",
        subject: "New Contact Message from ShopSwift",
        html: `<h3>New Message from ${name}</h3>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong><br/>${message}</p>`,
    };
    
    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: "Email sent successfully" });
    } 
    catch (err) {
        console.error("Email sending failed:", err);
        res.status(500).json({ success: false, message: "Email failed to send" });
    }
});

export default router;
