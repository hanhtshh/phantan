import React, { useContext } from 'react';
import {
    Table,
    TableHeader,
    TableCell,
    TableFooter,
    TableContainer,
    Button,
    Input,
    Card,
    CardBody,
    Pagination,
} from '@windmill/react-ui';
import { FiPlus } from 'react-icons/fi';

import useAsync from '../hooks/useAsync';
import useFilter from '../hooks/useFilter';
import NotFound from '../components/table/NotFound';
import Loading from '../components/preloader/Loading';
import { SidebarContext } from '../context/SidebarContext';
import PageTitle from '../components/Typography/PageTitle';
import CategoryServices from '../services/CategoryServices';
import CategoryTable from '../components/category/CategoryTable';
import SelectCategory from '../components/form/SelectCategory';
import MainDrawer from '../components/drawer/MainDrawer';
import CategoryDrawer from '../components/drawer/CategoryDrawer';
import MovieTable from '../components/movie/CategoryTable';
import CustomTable from '../components/movie/Table';
import SelectOption from '../components/form/SelectOption';
import OrderServices from '../services/OrderServices';

const MoviesList = () => {
    const { toggleDrawer } = useContext(SidebarContext);
    const { data, loading } = useAsync(OrderServices.getAllOrders);

    const {
        categoryRef,
        setFilter,
        handleChangePage,
        totalResults,
        resultsPerPage,
        dataTable,
        serviceData,
        handleSubmitCategory,
    } = useFilter(data);
    return (
        <>
            <PageTitle>Danh sách phim chiếu</PageTitle>

            <MainDrawer>
                <CategoryDrawer />
            </MainDrawer>

            <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
                <CardBody>
                    <form
                        onSubmit={handleSubmitCategory}
                        className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex"
                    >
                        <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                            <Input
                                ref={categoryRef}
                                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                                type="search"
                                name="search"
                                placeholder="Tìm kiếm theo tên phim"
                            />
                            <button
                                type="submit"
                                className="absolute right-0 top-0 mt-5 mr-1"
                            ></button>
                        </div>
                    </form>
                </CardBody>
            </Card>

            {loading ? (
                <Loading loading={loading} />
            ) : serviceData.length !== 0 ? (
                <div>
                    <TableContainer className="mb-8">
                        <Table>
                            <TableHeader>
                                <tr>
                                    <TableCell>Mã chiếu</TableCell>
                                    <TableCell>Mã phòng</TableCell>
                                    <TableCell>Mã phim</TableCell>
                                    <TableCell>Giá suất chiếu</TableCell>
                                    <TableCell>Thời gian chiếu</TableCell>
                                    <TableCell>Tên phim</TableCell>
                                    <TableCell>Thể loại</TableCell>
                                    <TableCell>Thời lượng</TableCell>
                                </tr>
                            </TableHeader>
                            <MovieTable categories={dataTable} />
                        </Table>
                        <TableFooter>
                            <Pagination
                                totalResults={totalResults}
                                resultsPerPage={resultsPerPage}
                                onChange={handleChangePage}
                                label="Table navigation"
                            />
                        </TableFooter>
                    </TableContainer>
                    <div style={{
                        display: "flex",
                        gap: "20px"
                    }}>
                        {/* <TableContainer className="mb-8">
                            <Table>
                                <TableHeader>
                                    <tr>
                                        <TableCell>Mã chiếu</TableCell>
                                        <TableCell>Hàng ghế</TableCell>
                                        <TableCell>Vị trí</TableCell>
                                    </tr>
                                </TableHeader>
                                <CustomTable categories={dataTable} />
                            </Table>
                        </TableContainer> */}
                        <TableContainer className="mb-8">
                            <div style={{
                                display: "flex",
                                gap: "30px",
                                padding: '20px',
                                alignItems: "center"
                            }}>
                                <div style={{ whiteSpace: "nowrap", width: "100px" }}>Hàng ghế:</div>
                                <SelectOption label={"Chọn hàng ghế"} name={"Hàng ghế"} />
                            </div>
                            <div style={{
                                display: "flex",
                                gap: "30px",
                                padding: '20px',
                                alignItems: "center"
                            }}>
                                <div style={{ whiteSpace: "nowrap", width: "100px" }}>Vị trí:</div>
                                <SelectOption label={"Chọn vị trí"} name={"place"} />
                            </div>
                            <div style={{
                                display: "flex",
                                padding: '15px 150px',
                                justifyContent: "space-between"
                            }}>
                                <Button>Xoá vé</Button>
                                <Button>Chọn vé</Button>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    paddingBottom: "20px"
                                }}>
                                <Button>Đặt vé</Button>
                            </div>
                        </TableContainer>
                    </div>
                </div>
            ) : (
                <NotFound title="Category" />
            )}
        </>
    );
};

export default MoviesList;
