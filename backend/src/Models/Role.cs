namespace NetCoreDemo.Models;

using Microsoft.AspNetCore.Identity;

public class Role : IdentityUser<int>
{
    public string RoleName { get; set; } = null!;

    public static explicit operator Role(string v)
    {
      throw new NotImplementedException();
    }
}