
var helper = require('sendgrid').mail;
var sendgrid = require('sendgrid')(process.env.SENDGRID_API_KEY);


module.exports = async function (context, myQueueItem) {

        var fromEmail = new helper.Email(process.env.EMAIL_SENDER);
        var toEmail = new helper.Email(myQueueItem);
        var subject = 'Welcome!!!';
        var content = new helper.Content('text/plain', 'Welcome to the familly ' + myQueueItem);
        var mail = new helper.Mail(fromEmail, subject, toEmail, content);
    

        var request = sendgrid.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: mail.toJSON()
        });

        sendgrid.API(request, function (error, response) {
            if (error) {
              console.log('Error response received');
            }
            console.log(response.statusCode);
            console.log(response.body);
            console.log(response.headers);
          });    

        console.log(request);

};