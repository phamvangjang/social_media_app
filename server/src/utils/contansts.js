// module.exports ={
//     enumData:{
//         notifications:[
//             'follow',
//             'like',
//             'comment',
//             'message',
//         ],
//         notificationTypeGroup: [
//             'newMessage',
//             'addToGroup',
//             'removedFromgroup',
//         ]
//     }
// }
const makeOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
}
module.exports = {
    makeOTP
}