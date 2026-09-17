import { PartialType } from '@nestjs/mapped-types';
import { CreatePatientDto } from './create.patient.DTO.js';

export class UpdatePatientDTO extends PartialType(CreatePatientDto) {}
