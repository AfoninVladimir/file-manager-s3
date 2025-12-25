namespace Entities
{
    public class GetDirectoriesResponse
    {
        public string BucketName { get; set; }
        public IEnumerable<Directory> Directories { get; set; } = [];
    }
}
