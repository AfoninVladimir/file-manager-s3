namespace FileManager.Models
{
    public class DeleteRequest
    {
        public IEnumerable<string> Objects { get; set; } = [];
    }
}
