import { Add, Delete, Edit, Schedule } from '@mui/icons-material'
import {
  Avatar,
  Box,
  Button,
  Card,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material'
import XStack from '../components/XStack'
import * as React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import SurveyCreateModal from '../components/Survey/SurveyCreateModal'
import TopLoadingBar from '../components/TopLoadingBar'
import { fetchSurvey, removeSurvey } from '../redux/surveyAction'
import maleAvatar from '../assets/images/user-profile/male_avatar.jpg'

const myTheme = {
  paper: {
    backgroundColor: 'rgb(231, 235, 240)',
  },
  tableCell: { height: 72.6 },
}
const dummySurveyList = [
  {
    id: '1908329960',
    startDate: '29-02-2023',
    endDate: '30-02-2023',
    user: {
      id: '0.2269004107213355',
      avatar: '/src/assets/male_avatar.jpg',
    },
    title: 'Lorem, ipsum',
  },
  {
    id: '7300481654',
    startDate: '13-02-2023',
    endDate: '16-02-2023',
    user: {
      id: '0.9906164631179921',
      avatar: '/src/assets/male_avatar.jpg',
    },
    title: 'dolor sit',
  },
  {
    id: '8753340743',
    startDate: '02-03-2023',
    endDate: '03-03-2023',
    user: {
      id: '0.18933110149270616',
      avatar: '/src/assets/male_avatar.jpg',
    },
    title: 'amet consectetur',
  },
  {
    id: '0150106740',
    startDate: '06-02-2023',
    endDate: '07-02-2023',
    user: {
      id: '0.3930810647888633',
      avatar: '/src/assets/male_avatar.jpg',
    },
    title: 'adipisicing elit.',
  },
  {
    id: '6694508155',
    startDate: '29-02-2023',
    endDate: '30-02-2023',
    user: {
      id: '0.5331217218313256',
      avatar: '/src/assets/male_avatar.jpg',
    },
    title: 'Earum omnis',
  },
  {
    id: '6248277648',
    startDate: '29-02-2023',
    endDate: '30-02-2023',
    user: {
      id: '0.11015959299298195',
      avatar: '/src/assets/male_avatar.jpg',
    },
    title: 'soluta ullam',
  },
  {
    id: '4853393763',
    startDate: '29-02-2023',
    endDate: '30-02-2023',
    user: {
      id: '0.7222810241056495',
      avatar: '/src/assets/male_avatar.jpg',
    },
    title: 'libero quod',
  },
  {
    id: '0501677297',
    startDate: '29-02-2023',
    endDate: '30-02-2023',
    user: {
      id: '0.2199278724023862',
      avatar: '/src/assets/male_avatar.jpg',
    },
    title: 'voluptatem vel!',
  },
  {
    id: '8364552798',
    startDate: '13-02-2023',
    endDate: '16-02-2023',
    user: {
      id: '0.8708846560103424',
      avatar: '/src/assets/male_avatar.jpg',
    },
    title: 'Eius quas',
  },
  {
    id: '7452071939',
    startDate: '02-03-2023',
    endDate: '03-03-2023',
    user: {
      id: '0.957633327769874',
      avatar: '/src/assets/male_avatar.jpg',
    },
    title: 'quae perspiciatis',
  },
  {
    id: '4599056741',
    startDate: '06-02-2023',
    endDate: '07-02-2023',
    user: {
      id: '0.07284753524807919',
      avatar: '/src/assets/male_avatar.jpg',
    },
    title: 'quis, voluptatem',
  },
  {
    id: '8063474081',
    startDate: '29-02-2023',
    endDate: '30-02-2023',
    user: {
      id: '0.14191488241994576',
      avatar: '/src/assets/male_avatar.jpg',
    },
    title: 'excepturi atque',
  },
  {
    id: '8968627564',
    startDate: '29-02-2023',
    endDate: '30-02-2023',
    user: {
      id: '0.7512350711295864',
      avatar: '/src/assets/male_avatar.jpg',
    },
    title: 'nobis ut,',
  },
  {
    id: '0467198995',
    startDate: '29-02-2023',
    endDate: '30-02-2023',
    user: {
      id: '0.8038125459937022',
      avatar: '/src/assets/male_avatar.jpg',
    },
    title: 'exercitationem laborum,',
  },
]

export default function SurveyListPage({ ...props }) {
  const [modal, setModal] = React.useState('')
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const survey = useSelector((store) => store.survey)

  const surveyList = survey.list

  useEffect(() => {
    fetchSurvey()
  }, [])

  const visibleRows = surveyList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  const emptyRows = page === 0 ? 0 : rowsPerPage - visibleRows.length

  return (
    <>
      <TopLoadingBar loading={survey.isLoading} />

      <Box component="main" sx={{ p: 2, backgroundColor: myTheme.paper.backgroundColor }}>
        <Stack direction="row" alignItems="center" gap={2}>
          <Typography variant="h6">All Survey</Typography>

          <Button
            sx={{ ml: 'auto' }}
            onClick={() => setModal('CREATE_SURVEY')}
            startIcon={<Add />}
            variant="contained"
            size="small"
          >
            Create
          </Button>
        </Stack>
        <Paper sx={{ mt: 2 }}>
          {survey.isLoading && survey.list.length === 0 ? (
            <Box
              sx={{ height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <Typography>Loading...</Typography>
            </Box>
          ) : survey.list.length === 0 ? (
            <Box
              sx={{ height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <Typography textAlign="center" color="gray">
                No Survey Yet
                <br />
                Create your first survey
              </Typography>
            </Box>
          ) : (
            <>
              <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Author</TableCell>
                      <TableCell>Title</TableCell>
                      <TableCell>Available</TableCell>
                      <TableCell align="right">Action</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {visibleRows.map((survey, i) => (
                      <TableRow key={survey.id}>
                        <TableCell>
                          <XStack alignItems="center" gap={2}>
                            <Avatar src={maleAvatar} />
                            Author02 Name
                          </XStack>
                        </TableCell>
                        <TableCell>{survey.title}</TableCell>
                        <TableCell>
                          {dummySurveyList[i].startDate} - {dummySurveyList[i].endDate}
                        </TableCell>

                        <TableCell align="right">
                          <IconButton LinkComponent={Link} to={`/survey/create?id=${survey.id}`}>
                            <Edit />
                          </IconButton>

                          <IconButton
                            onClick={() => {
                              if (confirm(`Are you sure to delete the "${survey.title}" survey.`))
                                removeSurvey(survey.id)
                            }}
                          >
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                    {emptyRows > 0 && (
                      <TableRow sx={{ height: emptyRows * myTheme.tableCell.height }}>
                        <TableCell colSpan={4}></TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 20, 30]}
                component="div"
                count={surveyList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(_, pageNo) => setPage(pageNo)}
                onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
              />
            </>
          )}
        </Paper>
        <SurveyCreateModal open={modal === 'CREATE_SURVEY'} onClose={() => setModal('')} />
      </Box>
    </>
  )
}
