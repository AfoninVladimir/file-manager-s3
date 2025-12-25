using Amazon.CDK.AWS.KMS;
using Amazon.S3;
using Amazon.S3.Model;
using Amazon.S3.Transfer;
using Entities;
using Enums;
using Tools;

namespace S3Service
{
    public class ServiceS3
    {
        private IAmazonS3 _s3Client;
        private string _s3_access_key { get; set; } = "YOUR_ACCESS_KEY";
        private string _s3_secret_access_key { get; set; } = "YOUR_SECRET_KEY";
        private string _bucketName { get; set; } = "YOUR_BUCKET_NAME";

        public ServiceS3()
        {
            AmazonS3Config configsS3 = new()
            {
                ServiceURL = "https://s3.timeweb.cloud"
            };
            _s3Client = new AmazonS3Client(_s3_access_key, _s3_secret_access_key, configsS3);
        }

        public async Task<GetDirectoriesResponse> GetDirectoryBuckets()
        {

            var listResponse = await _s3Client.ListBucketsAsync();

            var bucketLocation = await _s3Client.GetBucketLocationAsync(_bucketName);

            ListObjectsRequest request = new()
            {
                BucketName = _bucketName
            };
            ListObjectsResponse response = await _s3Client.ListObjectsAsync(request);

            var result = new GetDirectoriesResponse()
            {
                BucketName = response.Name,
                Directories = response.S3Objects.Select(item =>
                {
                    var unitSize = Utilities.CalculationSize(item.Size);

                    return new Entities.Directory()
                    {
                        Key = item.Key,
                        Size = unitSize.Size,
                        Unit = unitSize.Unit,
                        LastModified = item.LastModified.ToString("dd.MM.yyyy HH:mm"),
                        Type = item.Key.EndsWith(@"/") || item.Size == 0 ? Type3SObject.File : Type3SObject.Image,
                    };
                })
            };


            return result;
        }
        public async Task AddObject(MemoryStream stream, string fileName)
        {
            using (stream)
            {
                var fileTransferUtility = new TransferUtility(_s3Client);
                    await fileTransferUtility.UploadAsync(stream, _bucketName, fileName);
            }
        }
        public async Task DeleteObject(string keyName)
        {
            try
            {
                var deleteObjectRequest = new Amazon.S3.Model.DeleteObjectRequest
                {
                    BucketName = _bucketName,
                    Key = keyName,
                };
                await _s3Client.DeleteObjectAsync(deleteObjectRequest);
                //await _s3Client.DeleteObjectAsync(_bucketName, keyName);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
        }
        public async Task DeleteObjects(IEnumerable<string> objects)
        {
            foreach (var obj in objects)
            {
                await DeleteObject(obj);
            }
        }
        public async Task RenameObject(string oldKeyName, string newKeyName)
        {
            await CopyObject(oldKeyName, newKeyName);
            await DeleteObject(oldKeyName);
        }
        public async Task CopyObject(string oldKeyName, string newKeyName)
        {
            try
            {
                var copyRequest = new Amazon.S3.Model.CopyObjectRequest()
                {
                    SourceBucket = _bucketName,
                    DestinationBucket = _bucketName,
                    SourceKey = oldKeyName,
                    DestinationKey = newKeyName
                };

                await _s3Client.CopyObjectAsync(copyRequest);

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
        }
        public async Task CreateFolder(string folderName)
        {
            try
            {
                var putRequest = new Amazon.S3.Model.PutObjectRequest()
                {
                    BucketName = _bucketName,
                    Key = folderName + "/",
                };

                await _s3Client.PutObjectAsync(putRequest);

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
        }
    }
}
