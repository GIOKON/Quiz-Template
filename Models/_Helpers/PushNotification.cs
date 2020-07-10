using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using FirebaseAdmin;
using FirebaseAdmin.Messaging;
using Google.Apis.Auth.OAuth2;

namespace SaveOurFood.Models
{

    public class PushNotification
    {
        public static string SendNotification(string receiver, string title, string msg)
        {
            var result = "-1";
            var httpWebRequest = (HttpWebRequest)WebRequest.Create(Globals.FirebaseAddress);
            httpWebRequest.ContentType = "application/json";
            httpWebRequest.Headers.Add($"Authorization: key={Globals.FirebaseServerKey}");
            httpWebRequest.Headers.Add($"Sender: id={Globals.FirebaseSenderId}");
            httpWebRequest.Method = "POST";

            var payload = new
            {
                notification_key_name = Globals.FirebaseKeyName,
                notification_key = Globals.FirebaseKey,
                to = receiver,
                priority = "high",
                content_available = true,
                notification = new
                {
                    body = msg,
                    title = title
                },
            };

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                string json = JsonSerializer.Serialize(payload);
                streamWriter.Write(json);
                streamWriter.Flush();
            }

            var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
            using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
            {
                result = streamReader.ReadToEnd();
            }
            return result;
        }
    }
}
