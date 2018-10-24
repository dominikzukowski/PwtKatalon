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
    [Route("Activations")]
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
            var query = _context.Activations.Select(a => new ActivationsListModel { Id = a.Id, ActivationTime = a.ActivationTime, EnvironmentId = a.EnvironmentId,
                Status = a.Status,
                Version = a.Version,
                Comment = a.Comment,
                CounterPassed = a.CounterPassed ?? 0,
                CounterTotal = a.CounterTotal ?? 0,
                CounterFailed = a.CounterFailed ?? 0,
                CounterErrors = a.CounterErrors ?? 0,
                Organization = a.SendUser.Organization.OrganizationName,
                SendUserLogin = a.SendUser.Login,
            }).OrderByDescending(a=>a.Id).AsQueryable();
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

            var activations = await _context.Activations.Include(u => u.SendUser).Select(a => new
            { a.Id,
                a.ActivationTime,
                SendUserLogin = a.SendUser.Login,
                SendUserOrganization = a.SendUser.Organization.OrganizationName,
                a.Comment,
                a.TestSuite,
                a.ReportName,
                a.Status,
                a.RunArguments,
                a.EnvironmentId,
                a.Version,
                a.CounterTotal,
                a.CounterPassed,
                a.CounterFailed,
                a.CounterErrors,
                a.CounterSeconds,
                a.GitLog,
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
            var report = await _context.Activations.Select(a=> new { a.Id, a.ZippedResults }).FirstOrDefaultAsync(b => b.Id == id);
            if (report == null || report.ZippedResults == null)
            {
                return NotFound();
            }

            return File(report.ZippedResults, "application/zip");
        }


        [HttpGet("{id:int}/logs")]
        public async Task<IActionResult> GetActivationErrorAndConsoleLog([FromRoute] int id)
        {
            var activation = await _context.Activations.Select(a => new { a.Id, a.ErrorLog, a.ConsoleLog }).FirstOrDefaultAsync(b => b.Id == id);
            if (activation == null)
            {
                return NotFound();
            }

            return Ok(activation);
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
                a.Id,
                a.SendUser.Login
            })
                .Where(a => a.EnvironmentId == environment && a.Version == version).ToList();
            var result = new List<List<string>>();

            result.Add(new List<string> { "Dates", "Passed", "Failed", "Errors","Id", "User" });
            foreach (var item in act)
            {
                result.Add(new List<string> { item.ActivationTime.ToString(),
                    GetCounterValue(item.CounterPassed),
                    GetCounterValue(item.CounterFailed),
                    GetCounterValue(item.CounterErrors),
                     item.Id.ToString(), item.Login});
            }

            return Ok(result);
        }

        private string GetCounterValue(byte? counterValue)
        {
            return counterValue == null ? "0" : counterValue.ToString();
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