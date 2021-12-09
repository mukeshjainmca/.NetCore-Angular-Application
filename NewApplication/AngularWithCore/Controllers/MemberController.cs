using System.Collections.Generic;
using System.Linq;
using AngularWithCore.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AngularWithCore.Controllers
{
    [Route("api/[controller]")]
    public class MemberController : Controller
    {
        private List<Member> members = new List<Member>();
        // GET: api/values
        [HttpGet]
        [Route("GetMembers")]
        public IEnumerable<Member> GetMembers()
        {
            if (GetDataFromSession() == 0)
                FillMembers();
            return members;
        }

        // GET api/values/5
        [Route("GetMemberByCin")]
        [HttpGet("{id}")]
        public Member GetMemberById(string cin)
        {
            if(GetDataFromSession() == 0)
            FillMembers();
            return members.FirstOrDefault(m => m.Cin == cin);
        }

        [Route("AddMember")]
        [HttpPost]
        public Member AddMember([FromBody] Member member)
        {
            if (GetDataFromSession() == 0)
                FillMembers();
            if (member != null)
            {
                members.Add(member);
                SetDataInSession();
                return member;
            }
            return null;
        }

        [Route("DeleteMember")]
        [HttpDelete("{id}")]
        public int DeleteMember(string cin)
        {
            if (GetDataFromSession() == 0)
                FillMembers();
            if (!string.IsNullOrEmpty(cin))
            {
                var memberToRemove = members.FirstOrDefault(m => m.Cin == cin);
                members.Remove(memberToRemove);
                SetDataInSession();
                return 1;
            }
            return 0;
        }

        [Route("UpdateMember")]
        [HttpPut]
        public int UpdateMember([FromBody] Member member)
        {
            if (GetDataFromSession() == 0)
                FillMembers();
            if (member != null)
            {
                var memberToUpdate = members.FirstOrDefault(m => m.Cin == member.Cin);
                if (memberToUpdate != null)
                {
                    //var newMember = members.Find(m => m.Cin == member.Cin);
                    //newMember  = member;
                    var index = members.FindIndex(m => m.Cin == member.Cin);
                    members[index] = member;
                    SetDataInSession();
                }                
                return 1;
            }
            return 0;
        }
        
        private void FillMembers()
        {
            members = new List<Member>()
            {
                new Member{Cin = "1",FirstName = "FName1",LastName = "LName1",AddressLine1 = "Line1",AddressLine2 = "Line2",City = "City1",Ssn = "ssn1",State = "CA",Zip = "94534"},
                new Member{Cin = "2",FirstName = "FName2",LastName = "LName2",AddressLine1 = "Line2",AddressLine2 = "Line2",City = "City2",Ssn = "ssn2",State = "CA",Zip = "94534"},
                new Member{Cin = "3",FirstName = "FName3",LastName = "LName3",AddressLine1 = "Line3",AddressLine2 = "Line2",City = "City3",Ssn = "ssn3",State = "CA",Zip = "94534"},
                new Member{Cin = "4",FirstName = "FName4",LastName = "LName4",AddressLine1 = "Line4",AddressLine2 = "Line2",City = "City4",Ssn = "ssn4",State = "CA",Zip = "94534"},
                new Member{Cin = "5",FirstName = "FName5",LastName = "LName5",AddressLine1 = "Line5",AddressLine2 = "Line2",City = "City5",Ssn = "ssn5",State = "CA",Zip = "94534"},
                new Member{Cin = "6",FirstName = "FName6",LastName = "LName6",AddressLine1 = "Line6",AddressLine2 = "Line2",City = "City6",Ssn = "ssn6",State = "CA",Zip = "94534"},
                new Member{Cin = "7",FirstName = "FName7",LastName = "LName7",AddressLine1 = "Line7",AddressLine2 = "Line2",City = "City7",Ssn = "ssn7",State = "CA",Zip = "94534"},
                new Member{Cin = "8",FirstName = "FName8",LastName = "LName8",AddressLine1 = "Line8",AddressLine2 = "Line2",City = "City8",Ssn = "ssn8",State = "CA",Zip = "94534"},
                new Member{Cin = "9",FirstName = "FName9",LastName = "LName9",AddressLine1 = "Line9",AddressLine2 = "Line2",City = "City9",Ssn = "ssn9",State = "CA",Zip = "94534"},
                new Member{Cin = "10",FirstName = "FName10",LastName = "LName10",AddressLine1 = "Line10",AddressLine2 = "Line2",City = "City10",Ssn = "ssn10",State = "CA",Zip = "94534"}
            };
            SetDataInSession();
        }

        private void SetDataInSession()
        {
            var serialisedData = JsonConvert.SerializeObject(members);
            HttpContext.Session.SetString("members", serialisedData);
        }

        private int GetDataFromSession()
        {
            var data = HttpContext.Session.GetString("members");
            if (data != null)
            {
                members = JsonConvert.DeserializeObject<List<Member>>(data);
                return members.Count;
            }
            return 0;
        }
    }
}
