using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ModernisationChallenge.Website.ControllerParams.HomeController;
using DATask = ModernisationChallenge.DataAccess.Task;
using DataContext = ModernisationChallenge.DataAccess.DataContext;

namespace ModernisationChallenge.Website.Controllers
{
    [ApiController]
    [Route("data/[controller]")]
    public class HomeController : ControllerBase
    {
        private readonly DataContext _dataContext;

        public HomeController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet("Test")]
        public IEnumerable<object> Test()
        {
            return Enumerable.Range(1, 5).Select(index => new
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = Random.Shared.Next(-20, 55)
            })
            .ToArray();
        }

        [HttpGet("LoadTasks")]
        public async Task<IEnumerable<DATask>> LoadTasks()
        {
            var result = await (_dataContext.Tasks.Where(x => x.DateDeleted == null)?.OrderBy(x => x.Id)?.ToListAsync());
            return result;
        }

        [HttpPost("SaveTask")]
        public async Task<bool> SaveTask([FromBody] SaveTaskParams @params)
        {
            var newTask = new DATask()
            {
                Details = @params.Details,
                DateCreated = DateTime.Now,
                DateModified = DateTime.Now
            };
            _dataContext.Tasks.Add(newTask);
            bool result = (await _dataContext.SaveChangesAsync()) > 0;
            return result;
        }

        [HttpPut("EditTask")]
        public async Task<bool> EditTask([FromBody] EditTaskParams @params)
        {
            var editTask = await _dataContext.Tasks.SingleOrDefaultAsync(x => x.Id == @params.Id);
            editTask.DateModified = DateTime.Now;
            editTask.Details = @params.Details;
            bool result = (await _dataContext.SaveChangesAsync()) > 0;
            return result;
        }

        [HttpDelete("DeleteTask/{id}")]
        public async Task<bool> DeleteTask(int id)
        {
            var editTask = await _dataContext.Tasks.SingleOrDefaultAsync(x => x.Id == id);
            editTask.DateDeleted = DateTime.Now;
            bool result = (await _dataContext.SaveChangesAsync()) > 0;
            return result;
        }

        [HttpPut("CompleteTask")]
        public async Task<bool> CompleteTask([FromBody] CompleteTaskParams @params)
        {
            var editTask = await _dataContext.Tasks.SingleOrDefaultAsync(x => x.Id == @params.Id);
            editTask.DateModified = DateTime.Now;
            editTask.Completed = @params.Completed;
            bool result = (await _dataContext.SaveChangesAsync()) > 0;
            return result;
        }
    }
}
