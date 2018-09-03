﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PwtKatalon.Models;

namespace PwtKatalon.Controllers
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
        public IEnumerable<Activations> GetActivations()
        {
            return _context.Activations;
        }

        // GET: api/Activations/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetActivations([FromRoute] int id)
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

            return Ok(activations);
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