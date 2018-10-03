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
            return _context.Scheduller.Include(u=>u.SendUser).Select(s=>new {
                s.Id, s.SendUser.Login, s.DateFrom, s.DateTo, s.ActivationHour, 
                s.Repeats }).OrderByDescending(s => s.DateFrom);
        }

        // GET: api/Schedulers/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetSchedules([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var schedule = await _context.Scheduller.Include(u => u.SendUser)
                                                    .Select(s=>new
                                                    {
                                                        s.Id,
                                                        s.SendUser.Login,
                                                        s.DateFrom,
                                                        s.DateTo,
                                                        s.ActivationHour,
                                                        s.AlternativeTestSuite,
                                                        s.Comment,
                                                        s.Repeats,
                                                        s.SendUserId
                                                    })
                                                    .FirstOrDefaultAsync(s => s.Id == id);

            if (schedule == null)
            {
                return NotFound();
            }

            return Ok(schedule);
        }
    }
}