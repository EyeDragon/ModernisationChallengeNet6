namespace ModernisationChallenge.DataAccess
{
    public class Task
    {
        public int? Id { get; set; }

        public DateTime? DateCreated { get; set; } = null;

        public DateTime? DateModified { get; set; } = null;

        public DateTime? DateDeleted { get; set; } = null;

        public bool? Completed { get; set; } = false;

        public string Details { get; set; } = string.Empty;
    }
}
