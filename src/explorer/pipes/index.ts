import {FilterAddressPipe} from './filter-address.pipe';
import {FilterBlockPipe} from './filter-block.pipe';

export const providerPipes: any[] = [FilterAddressPipe, FilterBlockPipe ];

export * from './filter-address.pipe';
export * from './filter-block.pipe';

import {FilterAddressSlicePipe} from './filter-address-slice.pipe';
import {FilterBlockSlicePipe} from './filter-block-slice.pipe';

export const customScrollPipes: any[] = [FilterAddressSlicePipe, FilterBlockSlicePipe];

export * from './filter-address-slice.pipe';
export * from './filter-block-slice.pipe';