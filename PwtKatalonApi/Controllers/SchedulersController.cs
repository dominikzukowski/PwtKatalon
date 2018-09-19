using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PwtKatalonApi.Models;

namespace PwtKatalonApi.Controllers
{
    [Produces("application/json")]
    [Route("api/Schedulers")]
    public class SchedulerController : Controller
    {
        private readonly pwtkatalonContext _context;

        public SchedulerController(pwtkatalonContext context)
        {
            _context = context;
        }

        // GET: api/Schedulers
        [HttpGet]
        public IEnumerable<dynamic> GetSchedules()
        {
            return _context.Scheduller.OrderByDescending(s => s.DateFrom);
            return _context.Activations.Select(a => new { a.Id, a.Status ,a.ActivationTime, a.EnvironmentId, a.Version }).OrderByDescending(a=>a.ActivationTime);
        }

        // GET: api/Schedulers/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetSchedules([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var schedule = await _context.Scheduller.FirstOrDefaultAsync(s => s.Id == id);

            if (schedule == null)
            {
                return NotFound();
            }

            return Ok(schedule);
        }
    }
}