import { z } from 'zod';
import { ACCEPTED, MAX_SIZE } from '../constants';
import { sizeInMB } from '../utils/size';

export const filesSchema = z
  .custom<FileList>()
  .transform((files) => Array.from(files))
  .transform((files) => files.filter((file) => file.size > 0))
  .refine(
    (files) => files.every((file) => sizeInMB(file.size) <= MAX_SIZE),
    `최대 파일용량: ${MAX_SIZE}MB`,
  )
  .refine(
    (files) => files.every((file) => ACCEPTED.includes(file.type)),
    '지원하지 않은 확장자입니다.',
  );
