using LoginRegistrationApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;

namespace LoginRegistrationApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistrationController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public RegistrationController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpPost]
        [Route("registration")]
        public IActionResult registration(Registration registration)
        {
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("LoginCon").ToString());
            con.Open();
            SqlCommand cmd = new SqlCommand($"INSERT INTO registration(Email,Password) VALUES('{registration.Email}', '{registration.Password}' )", con);
            int i = cmd.ExecuteNonQuery();
            con.Close();

            if (i > 0)
            {
                return Ok("Data inserted");
            }
            else
            {
                return BadRequest("Error");
            }
        }
        [HttpPost]
        [Route("login")]
        public IActionResult login([FromBody] Registration registration)
        {
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("LoginCon").ToString());
            SqlDataAdapter da = new SqlDataAdapter($"SELECT * FROM Registration WHERE Email = '{registration.Email}' AND PASSWORD ='{registration.Password}'", con);
            DataTable dt = new DataTable();
            da.Fill(dt);

            if (dt.Rows.Count > 0)
            {
                return Ok("Valid User");
            }
            else
            {
                return NotFound("Invalid User");
            }
        }



    }
}
