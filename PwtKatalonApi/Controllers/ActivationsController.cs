using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PwtKatalonApi.Models;
using PwtKatalonApi.Utils.Paging;

namespace PwtKatalonApi.Controllers
{
    [Produces("application/json")]
    [Route("api/Activations")]
    public class ActivationsController : Controller
    {
        private readonly pwtkatalonContext _context;
        private readonly IUrlHelper _urlHelper;

        public ActivationsController(pwtkatalonContext context, IUrlHelper urlHelper)
        {
            _context = context;
            _urlHelper = urlHelper;
        }

        // GET: api/Activations?PageNumber=1&PageSize=10
        [HttpGet(Name= "GetActivations")]
        public IActionResult GetActivations(PagingParams pagingParams)
        {
            var query = _context.Activations.Select(a=> new ActivationsListModel{ Id = a.Id, ActivationTime = a.ActivationTime, EnvironmentId = a.EnvironmentId,
                Status = a.Status,
                Version = a.Version }).AsQueryable();
            var model = new PagedList<ActivationsListModel>(query, pagingParams.PageNumber, pagingParams.PageSize);

            var output = new PagingOutputModel<ActivationsListModel>
            {
                Paging = model.GetHeader(),
                Links = GetLinks(model),
                Items = model.List
            };
            return Ok(output);
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
            { a.Id,
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
                a.CounterSeconds,
                isZippedResults = a.ZippedResults == null ? false : true
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
                a.Version,
                a.Id
            })
                .Where(a => a.EnvironmentId == environment && a.Version == version).ToList();
            var result = new List<List<string>>();

            result.Add(new List<string> { "Dates", "Passed", "Failed", "Errors","Id" });
            foreach (var item in act)
            {
                result.Add(new List<string> { item.ActivationTime.ToString(), item.CounterPassed.ToString(), item.CounterFailed.ToString(), item.CounterErrors.ToString(), item.Id.ToString()});
            }

            return Ok(result);
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

        private List<LinkInfo> GetLinks(PagedList<ActivationsListModel> list)
        {
            var links = new List<LinkInfo>();

            if (list.HasPreviousPage)
                links.Add(CreateLink("GetActivations", list.PreviousPageNumber, list.PageSize, "previousPage", "GET"));

            links.Add(CreateLink("GetActivations", list.PageNumber, list.PageSize, "self", "GET"));

            if (list.HasNextPage)
                links.Add(CreateLink("GetActivations", list.NextPageNumber, list.PageSize, "nextPage", "GET"));

            return links;
        }

        private LinkInfo CreateLink(string routeName, int pageNumber, int pageSize, string rel, string method)
        {
            return new LinkInfo
            {
                Href = _urlHelper.Link(routeName,
                            new { PageNumber = pageNumber, PageSize = pageSize }),
                Rel = rel,
                Method = method
            };
        }

    }
}