using System;
using Microsoft.EntityFrameworkCore;

namespace NewApplication.Models
{
    public class ErrorViewModel
    {
        public string RequestId { get; set; }

        public bool ShowRequestId => !string.IsNullOrEmpty(RequestId);        
    }
}