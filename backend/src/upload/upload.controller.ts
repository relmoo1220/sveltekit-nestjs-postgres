import { Controller, Get, Post, Body, Put, Param, Delete, Req, Res, HttpException, HttpStatus, Query } from '@nestjs/common';
import { UploadService } from './upload.service';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { MultipartFile } from '@fastify/multipart';
import { FastifyReply, FastifyRequest } from 'fastify';
import { Upload } from './entities/upload.entity';

// Extend the FastifyRequest interface to include the `file()` method
interface FastifyRequestWithFile extends FastifyRequest {
  file: () => Promise<MultipartFile>;
}

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  // POST method for parsing CSV data and inserting them into the repository
  @Post('csv')
  async upload(@Req() req: FastifyRequestWithFile, @Res() res: FastifyReply) {
    try {
      // Retrieve the file from the request
      const file: MultipartFile = await req.file();

      // If there is no file uploaded
      if (!file) {
        return res.status(400).send({ message: 'No file uploaded' });
      }

      // Validate file type
      const validExtensions = ['.csv'];

      // Check file extension
      const fileExtension = file.filename.split('.').pop();
      if (!validExtensions.includes(`.${fileExtension}`)) {
        return res.status(400).send({
          message: 'Invalid file extension. Only CSV files are allowed.',
        });
      }

      // Convert the file to a buffer
      const fileBuffer = await file.toBuffer();

      // Process the CSV file buffer using the service (logic for parsing the CSV is in this service)
      const data = await this.uploadService.uploadFile(fileBuffer);

      // Send the processed data as JSON
      return res.send(data);
    } catch (error) {
      // Handle any errors
      return res
        .status(500)
        .send({ message: 'Failed to process file', error: error.message });
    }
  }

  // POST method for creating a new row in the repository
  @Post('create')
  create(@Body() createUploadDto: CreateUploadDto) {
    return this.uploadService.create(createUploadDto);
  }

  // GET method for reading the all rows from the repository
  @Get('get-all')
  async findAll(): Promise<any> {
    const data = await this.uploadService.findAll();
    return data;
  }

  // GET method for reading a specific row from the repository
  @Get('get-one/:id')
  findOne(@Param('id') id: number): Promise<Upload> {
    return this.uploadService.findOne(id);
  }

  // PUT method for updating a specific row from the repository
  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateUploadDto: UpdateUploadDto) {
    return this.uploadService.update(+id, updateUploadDto);
  }

  // DELETE method for deleting a specific row from the repository
  @Delete('delete/:id')
  async remove(@Param('id') id: number): Promise<void> {
    const result = await this.uploadService.remove(id);
    if (!result) {
      throw new HttpException('Row not found', HttpStatus.NOT_FOUND);
    }
  }

  // GET method for querying the repository based on user's search term
  @Get('search')
  async search(@Query('term') term: string): Promise<Upload[]> {
    return this.uploadService.search(term);
  }
}
