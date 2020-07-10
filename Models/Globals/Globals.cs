using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SaveOurFood.Models
{
    public static class Globals
    {
        #region RoleTags
        
        /// <summary>
        /// Admin
        /// </summary>
        public static string Admin = "Admin";

        /// <summary>
        /// SuperAdmin
        /// </summary>
        public static string SuperAdmin = "SuperAdmin";

        /// <summary>
        /// Owner
        /// </summary>
        public static string Owner = "Owner";

        /// <summary>
        /// User
        /// </summary>
        public static string User = "User";

        #endregion

        /// <summary>
        /// Firebase Server Key
        /// </summary>
        public static string FirebaseServerKey = "AIzaSyCkTkcfldeRt1IJYMQfgtTTaGNNebHARCU";
        public static string FirebaseSenderId = "9105854317";
        public static string FirebaseAddress = "https://fcm.googleapis.com/fcm/send";
        public static string FirebaseKeyName = "click_action";
        public static string FirebaseKey = "FLUTTER_NOTIFICATION_CLICK";


        public static string FirebaseTopicDonations = "/topics/Donations";
        public static string FirebaseMsgDonationPack = "Donation Package Added ";
        public static string FirebaseMsgAssignAdded = "Assignment Added ";
        public static string FirebaseMsgAssignReceived = "New Assignment Received ";
        public static string FirebaseMsgRefresh = "Assignment Added ";

        public static string FirebaseStatusAccepted = "An Assignment was accepted ";
        public static string FirebaseStatusRejected = "An Assignment was rejected ";
        public static string FirebaseStatusInTransit = "An Assignment is in transit ";
        public static string FirebaseStatusDelivered = "An Assignment was delivered ";
        public static string FirebaseNoDeviceId = "No device Id found for this Volunteer. (Hasn\'t installed or logged into the Mobile App. They will not be notified!)";


        /// <summary>
        /// Flutter ListBuilder Page Size
        /// </summary>
        public static int PageSize = 10;

        #region Token Globals
        /// <summary>
        /// Used by Token in Authenticate Controller
        /// </summary>
        public static string Issuer = "MDL";

            /// <summary>
            /// Used by Token in Authenticate Controller
            /// </summary>
            public static string Audience = "MDL";

            /// <summary>
            /// Used by Token in Authenticate Controller
            /// to set how many hours the token is valid
            /// </summary>
            public static int HoursForToken = 3;

            /// <summary>
            /// Used by Token in Authenticate Controller
            /// to secure the token
            /// </summary>
            public static string SymmetricKey = "j62zA0&yQ&ph!crc";
        #endregion
        
    }
}
