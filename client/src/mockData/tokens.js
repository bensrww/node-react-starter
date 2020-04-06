import { tokenStatus } from '../constants';
const { READY, USED, INVALID, PENDING } = tokenStatus;
export default [
  {
    tokenValue: '111111',
    status: READY,
  },
  {
    tokenValue: '111112',
    status: READY,
  },
  {
    tokenValue: '111113',
    status: READY,
  },
  {
    tokenValue: '211111',
    status: USED,
  },
  {
    tokenValue: '211112',
    status: USED,
  },
  {
    tokenValue: '211113',
    status: USED,
  },
  {
    tokenValue: '311111',
    status: INVALID,
  },
  {
    tokenValue: '311112',
    status: INVALID,
  },
  {
    tokenValue: '311113',
    status: INVALID,
  },
  {
    tokenValue: '411111',
    status: PENDING,
  },
  {
    tokenValue: '411112',
    status: PENDING,
  },
  {
    tokenValue: '411113',
    status: PENDING,
  },
];
