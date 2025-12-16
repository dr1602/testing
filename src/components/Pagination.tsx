import { range } from '../utils/utils';

type PaginationTypes = {
  total: number;
  limit: number;
  currentPage: number;
  selectPage: (page: number) => void;
};

export const Pagination = ({
  total,
  limit,
  currentPage,
  selectPage,
}: PaginationTypes) => {
  const pagesCount = Math.ceil(total / limit);
  const pages = range(1, pagesCount + 1);

  return (
    <ul className='pagination'>
      {pages.map((page) => (
        <li
          role='cell'
          key={page}
          onClick={() => selectPage(page)}
          className={`page-item ${currentPage === page ? 'active' : ''}`}
        >
          <span className='page-link'>{page}</span>
        </li>
      ))}
    </ul>
  );
};
