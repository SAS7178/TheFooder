using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TheFooder.Models;
using TheFooder.Repositories;

namespace TheFooder.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QouteController : ControllerBase
    {
        private readonly IQouteRepository _qouteRepository;

        public UserProfile Authentication { get; private set; }

        public QouteController(IQouteRepository QouteRepository)
        {
            _qouteRepository = QouteRepository;
        }
        //get single recipe by its id for edit component
        //[Authorize]
       
        [HttpGet("/{qouteId}")]
        public IActionResult GetQoute(int qouteId)
        {
            return Ok(_qouteRepository.GetQouteById(qouteId));

        }
        //[Authorize]
        [HttpPost]
        public IActionResult Post(Qoute qoute)
        {
            _qouteRepository.Add(qoute);
            return CreatedAtAction("Get", new { id = qoute.Id }, qoute);
        }

    }
}
