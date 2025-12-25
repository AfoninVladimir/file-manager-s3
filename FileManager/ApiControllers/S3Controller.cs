using Entities;
using Microsoft.AspNetCore.Mvc;
using S3Service;
using FileManager.Models;
using System.IO;

namespace FileManager.ApiControllers
{
    [ApiController]
    [Route("S3Manager")]
    public class S3Controller : ControllerBase
    {
        [HttpGet]
        [Route("directories")]
        public async Task<GetDirectoriesResponse> GetDirectories()
        {
            return await new ServiceS3().GetDirectoryBuckets();
        }

        [HttpPost]
        [Route("folder/create")]
        public async Task<IActionResult> CreateFolder([FromBody] FolderCreateRequest request)
        {
            await new ServiceS3().CreateFolder(request.FolderName);

            return Ok();
        }

        [HttpPost]
        [Route("object/add")]
        public async Task<IActionResult> AddObject(IFormFileCollection files)
        {
            foreach (var file in files)
            {
                using (var stream = new MemoryStream())
                {
                    await file.CopyToAsync(stream);
                    await new ServiceS3().AddObject(stream, file.FileName);
                }
            }

            return Ok();
        }

        [HttpDelete]
        [Route("object/delete")]
        public async Task<IActionResult> DeleteObject([FromBody] DeleteRequest request)
        {
            await new ServiceS3().DeleteObjects(request.Objects);
            return Ok();
        }

        [HttpPost]
        [Route("object/rename")]
        public async Task<IActionResult> RenameObject([FromBody] RenameRequest request)
        {
            await new ServiceS3().RenameObject(request.OldName, request.NewName);
            return Ok();
        }
    }
}
