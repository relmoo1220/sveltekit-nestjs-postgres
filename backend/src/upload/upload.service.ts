import { Injectable } from '@nestjs/common';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { Upload } from './entities/upload.entity';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Readable } from 'stream';
import * as fastcsv from 'fast-csv';

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(Upload)
    private readonly uploadRepository: Repository<Upload>,
  ) {}

  async uploadFile(fileBuffer: Buffer): Promise<any> {
    const data: Upload[] = [];

    // Convert buffer to readable stream
    const stream = Readable.from(fileBuffer.toString());

    // Returns a promise object which represents the eventual completion/failure of an asynchronous operation
    // Resolve is called when the asynchronous operation is successful
    // Reject is called when the asynchronous operation is unsuccessful
    // Parse the CSV buffer
    await new Promise((resolve, reject) => {
      fastcsv
        .parseStream(stream, { headers: true })
        .on('data', (row) => {
          const upload = new Upload();
          upload.postId = Number(row.postId);
          upload.name = row.name;
          upload.email = row.email;
          upload.body = row.body;
          data.push(upload);
        })
        .on('end', async () => {
          try {
            // Save the data to the database
            await this.uploadRepository.save(data);
            resolve('File processed successfully');
          } catch (error) {
            console.log('Error saving data: ', error);
            reject(error);
          }
        })
        .on('error', (error) => {
          console.error('Error parsing CSV:', error);
          reject(error);
        });
    });

    return { message: 'File processed and data saved to database' };
  }

  async create(createUploadDto: CreateUploadDto): Promise<Upload> {
    // Map DTO Entity
    const upload = new Upload();
    upload.postId = createUploadDto.postId;
    upload.name = createUploadDto.name;
    upload.email = createUploadDto.email;
    upload.body = createUploadDto.body;

    console.log(upload.postId);

    // Save entity to the database
    return await this.uploadRepository.save(upload);
  }

  // Function returns all the rows in the repository
  findAll() {
    return this.uploadRepository.find();
  }

  // Function returns a specific row according to the id (primary key)
  findOne(id: number): Promise<Upload> {
    return this.uploadRepository.findOneBy({ id });
  }

  // Function to update a specific row according to the id (primary key)
  async update(id: number, updateUploadDto: UpdateUploadDto): Promise<Upload> {
    const upload = await this.uploadRepository.findOneBy({ id });
    if (!upload) {
      throw new Error('File upload record not found');
    }

    // Update fields based on the DTO values
    Object.assign(upload, updateUploadDto);

    return await this.uploadRepository.save(upload);
  }

  // Function to remove the specific row according to the id (primary key)
  async remove(id: number): Promise<Boolean> {
    const result = await this.uploadRepository.delete(id);
    return result.affected > 0;
  }

  // Function to search for relevant rows given the search term
  async search(term: string): Promise<Upload[]> {
    const uploads = await this.uploadRepository.find({
      where: [
        { name: ILike(`%${term}%`) }, // Search by name field, adjust as needed
        { email: ILike(`%${term}%`) }, // Search by email field, adjust as needed
        { body: ILike(`%${term}%`) }, // Search by body field, adjust as needed
      ],
    });

    // If no results are found, return an empty placeholder for the headers
    if (uploads.length === 0) {
      return [
        {
          postId: null,
          id: null,
          name: '',
          email: '',
          body: '',
        } as Upload,
      ];
    }

    return uploads;
  }
}
