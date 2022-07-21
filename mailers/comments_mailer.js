// const nodeMailer = require('../config/nodemailer');


// // this is another way of exporting a method
// exports.newComment = (comment) => {
//     console.log('inside newComment mailer', comment);

//     nodeMailer.transporter.sendMail({
//        from: 'swetasingh7076@gmail.com',
//        to: comment.user.email,
//        subject: "New Comment Published!",
//        html: '<h1>Yup, your comment is now published!</h1>' 
//     }, (err, info) => {
//         if (err){
//             console.log('Error in sending mail', err);
//             return;
//         }

//         console.log('Message sent', info);
//         return;
//     });
// }

const nodeMailer = require('../config/nodemailer');


// this is another way of exporting a method
exports.newComment = (comment) => {
    let htmlString = nodeMailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');

    nodeMailer.transporter.sendMail({
       from: 'swetasingh7076@gmail.com',
       to: comment.user.email,
       subject: "New Comment Published!",
       html: htmlString 
    }, (err, info) => {
        if (err){
            console.log('Error in sending mail', err);
            return;
        }

        console.log('Message sent', info);
        return;
    });
}