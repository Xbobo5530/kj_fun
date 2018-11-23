// const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


// exports.sendNotification = functions.database.ref('/notifications/messages/{pushId}')
//     .onWrite(event => {
//         const message = event.data.current.val();
//         const senderUid = message.from;
//         const receiverUid = message.to;
//         const promises = [];

//         if (senderUid == receiverUid) {
//             //if sender is receiver, don't send notification
//             promises.push(event.data.current.ref.remove());
//             return Promise.all(promises);
//         }

//         const getInstanceIdPromise = admin.database().ref(`/users/${receiverUid}/instanceId`).once('value');
//         const getReceiverUidPromise = admin.auth().getUser(receiverUid);

//         return Promise.all([getInstanceIdPromise, getReceiverUidPromise]).then(results => {
//             const instanceId = results[0].val();
//             const receiver = results[1];
//             console.log('notifying ' + receiverUid + ' about ' + message.body + ' from ' + senderUid);

//             const payload = {
//                 notification: {
//                     title: receiver.displayName,
//                     body: message.body,
//                     icon: receiver.photoURL
//                 }
//             };

//             admin.messaging().sendToDevice(instanceId, payload)
//                 .then(function (response) {
//                     console.log("Successfully sent message:", response);
//                 })
//                 .catch(function (error) {
//                     console.log("Error sending message:", error);
//                 });
//         });
//     });


// const functions = require('firebase-functions');
// const admin = require('firebase-admin');
// admin.initializeApp(functions.config().firebase);
// exports.sendAdminNotification = functions.database.ref('/Messages/{pushId}').onWrite(event => {
//     // const news= event.data.val();
//     //      if(news.priority==1){
//     //      const payload = {notification: {
//     //          title: 'New news',
//     //          body: `${news.title}`
//     //          }
//     //      };

//     const message = event.data.val();
//     const payload = {
//         notification: {
//             title: `${message.from}`,
//             body: `${message.message}`
//         }
//     }


//     return admin.messaging().sendToTopic("test", payload)
//         .then(function (response) {
//             console.log('Notification sent successfully:', response);
//             return ;
//         })
//         .catch(function (error) {
//             console.log('Notification sent failed:', error);
//         });
// }
// );

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
exports.sendNotification = functions.firestore.document('/Messages/{id}').onCreate((snap, context) =>{
    const message = snap.data();
    const topic = `${message.community_id}`
    const payload = {
        notification: {
            title: `${message.from}`,
            body: `${message.message}`
        },
        data: {
            communityId : `${message.community_id}`,
            chatId : `${message.chat_id}`,
            userId : `${message.user_id}`,
        }
    }

    return admin.messaging().sendToTopic(topic, payload)
    .then(function (response) {
        console.log('Notification sent successfully:', response);
        // const messageRef =  snap.ref;
        // functions.firestore.document(messageRef)
        return ;
    })
    .catch(function (error) {
        console.log('Notification sent failed:', error);
    });
})




// .database.ref('/Messages/{pushId}').onWrite(event => {
//     // const news= event.data.val();
//     //      if(news.priority==1){
//     //      const payload = {notification: {
//     //          title: 'New news',
//     //          body: `${news.title}`
//     //          }
//     //      };

//     // const message = event.data.val();
//     // const payload = {
//     //     notification: {
//     //         title: `${message.from}`,
//     //         body: `${message.message}`
//     //     }
//     // }


//     return admin.messaging().sendToTopic("test", payload)
//         .then(function (response) {
//             console.log('Notification sent successfully:', response);
//             return ;
//         })
//         .catch(function (error) {
//             console.log('Notification sent failed:', error);
//         });
// }
// );