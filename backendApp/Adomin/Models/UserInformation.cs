using Org.BouncyCastle.Asn1.Crmf;
using System.ComponentModel.DataAnnotations;
using System.Data;

namespace backendApp.Models {
    public class UserInformation {
        public string? UserName {
            get; set;
        }
        public string? Password {
            get; set;
        }

    }
}
