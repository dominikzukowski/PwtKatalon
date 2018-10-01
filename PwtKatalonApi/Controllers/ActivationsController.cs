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
    [Route("api/Activations")]
    public class ActivationsController : Controller
    {
        private readonly pwtkatalonContext _context;

        public ActivationsController(pwtkatalonContext context)
        {
            _context = context;
        }

        // GET: api/Activations
        [HttpGet]
        public IEnumerable<dynamic> GetActivations()
        {
            return _context.Activations.Select(a => new { a.Id, a.Status ,a.ActivationTime, a.EnvironmentId, a.Version }).OrderByDescending(a=>a.ActivationTime);
        }

        // GET: api/Activations/5
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetActivations([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var activations = await _context.Activations.Select(a => new
                {a.Id,
                a.ActivationTime,
                a.SchedulerId,
                a.SendUserId,
                a.ReceiveUserId,
                a.Comment,
                a.TestSuite,
                a.ReportName,
                a.Status,
                a.RunArguments,
                a.EnvironmentId,
                a.Version,
                //a.JunitResult,
                //a.JsonResult,
                a.CounterTotal,
                a.CounterPassed,
                a.CounterFailed,
                a.CounterErrors,
                a.CounterSeconds
            }).SingleOrDefaultAsync(m => m.Id == id);

            if (activations == null)
            {
                return NotFound();
            }

            return Ok(activations);
        }

        [HttpGet("{id:int}/report")]
        public async Task<IActionResult> GetActivationReport([FromRoute] int id)
        {
            var report = _context.Activations.Select(a=> new { a.Id, a.ZippedResults }).FirstOrDefaultAsync(b => b.Id == id);
            if (report == null || report.Result.ZippedResults == null)
            {
                return NotFound();
            }

            return File(report.Result.ZippedResults, "application/zip");
        }

        [HttpGet("versions")]
        public IEnumerable<string> GetVersions()
        {
            return _context.Activations.Select(a => a.Version).Distinct();
        }

        [HttpGet("environments")]
        public IEnumerable<string> GetEnvironments()
        {
            return _context.Activations.Select(a => a.EnvironmentId).Distinct();
        }

        [HttpGet("details/{environment}/{version}")]
        public async Task<IActionResult> GetDetailsForEnvironmentVersion([FromRoute] string environment, string version)
        {
            var act = _context.Activations.Select(a=>new
            {
                a.ActivationTime,
                a.CounterPassed,
                a.CounterFailed,
                a.CounterErrors,
                a.EnvironmentId,
                a.Version
            })
                .Where(a => a.EnvironmentId == environment && a.Version == version).ToList();
            var dupa = new List<List<string>>();

            dupa.Add(new List<string> { "Dates", "Passed", "Failed", "Errors" });
            foreach (var item in act)
            {
                dupa.Add(new List<string> { item.ActivationTime.ToString(), item.CounterPassed.ToString(), item.CounterFailed.ToString(), item.CounterErrors.ToString() });
            }

            
            return Ok(dupa);
        }

        // PUT: api/Activations/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutActivations([FromRoute] int id, [FromBody] Activations activations)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != activations.Id)
            {
                return BadRequest();
            }

            _context.Entry(activations).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ActivationsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }



        // POST: api/Activations
        [HttpPost]
        public async Task<IActionResult> PostActivations([FromBody] Activations activations)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Activations.Add(activations);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetActivations", new { id = activations.Id }, activations);
        }

        // DELETE: api/Activations/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivations([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var activations = await _context.Activations.SingleOrDefaultAsync(m => m.Id == id);
            if (activations == null)
            {
                return NotFound();
            }

            _context.Activations.Remove(activations);
            await _context.SaveChangesAsync();

            return Ok(activations);
        }

        private bool ActivationsExists(int id)
        {
            return _context.Activations.Any(e => e.Id == id);
        }
    }
}