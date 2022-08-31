import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import MoveUpIcon from '@mui/icons-material/MoveUp';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import PageviewIcon from '@mui/icons-material/Pageview';
import AddIcon from '@mui/icons-material/Add';
import AddLocationIcon from '@mui/icons-material/AddLocationAlt';
import EditLocationIcon from '@mui/icons-material/EditLocationAlt';
import EditIcon from '@mui/icons-material/Edit';
import ArchiveIcon from '@mui/icons-material/Archive';

import NavBar from '/components/NavBar';
import AdminOnly from '/components/admin/AdminOnly';

import { useRouter } from 'next/router';

import NextLink from 'next/link';

import Image from 'next/image';
import fullLogo from '/public/full-logo.svg';

import { useSession, signOut, signIn, getSession } from 'next-auth/react';


import { useState, useEffect } from 'react';

export default function HomePage() {
    const router = useRouter();
    const { data: session } = useSession();
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        if (session) {
            console.log(session);
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    }, [session]);
    if (loggedIn) {
        let isAdmin = false;
        if (session.user.type == "admin") {
            isAdmin = true;
        }
        return (
            <>
            <Container sx={{ mb: 10 }}>
                <Stack sx={{ py: 2 }} direction="row" justifyContent="center" alignItems="center" ><NextLink href="/"><Image src={fullLogo} alt="Camp Chef Logo" /></NextLink></Stack>
                <Paper elevation={2} sx={{ my: 2, py: 1 }}>
                    <Container>
                        <h1>Hi, <Box sx={{ color: 'primary.main', display: 'inline' }}>{session.user.fname}</Box>!</h1>
                        <Button onClick={() => signOut()} variant='contained' sx={{ mb: 2}}>Sign Out</Button>
                    </Container>
                </Paper>
                <Stack spacing={1}>
                    <Card>
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            Manage Inventory
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Do inventory transfers, create new products and bins, lookup where items are, lookup what items are in a bin, etc...
                          </Typography>
                          <List>
                              <NextLink href="/inventory/transfer/"><ListItemButton>
                                  <ListItemIcon><MoveUpIcon /></ListItemIcon>
                                  <ListItemText primary="Inventory Transfers" />
                              </ListItemButton></NextLink>
                              <NextLink href="/inventory/bins/"><ListItemButton>
                                  <ListItemIcon><PageviewIcon /></ListItemIcon>
                                  <ListItemText primary="Bin Inquiry" />
                              </ListItemButton></NextLink>
                              <NextLink href="/inventory/items/"><ListItemButton>
                                  <ListItemIcon><ManageSearchIcon /></ListItemIcon>
                                  <ListItemText primary="Item Lookup" />
                              </ListItemButton></NextLink>
                              <AdminOnly>
                                  <NextLink href="/inventory/setup/"><ListItemButton>
                                      <ListItemIcon><ArchiveIcon /></ListItemIcon>
                                      <ListItemText primary="Recieving" />
                                  </ListItemButton></NextLink>
                                  <NextLink href="/inventory/create/bin/"><ListItemButton>
                                      <ListItemIcon><AddLocationIcon /></ListItemIcon>
                                      <ListItemText primary="New Bin" />
                                  </ListItemButton></NextLink>
                                  <NextLink href="/inventory/edit/bin/"><ListItemButton>
                                      <ListItemIcon><EditLocationIcon /></ListItemIcon>
                                      <ListItemText primary="Edit Bin" />
                                  </ListItemButton></NextLink>
                                  <NextLink href="/inventory/create/product/"><ListItemButton>
                                      <ListItemIcon><AddIcon /></ListItemIcon>
                                      <ListItemText primary="New Product" />
                                  </ListItemButton></NextLink>
                                  <NextLink href="/inventory/edit/product/"><ListItemButton>
                                      <ListItemIcon><EditIcon /></ListItemIcon>
                                      <ListItemText primary="Edit Product" />
                                  </ListItemButton></NextLink>
                              </AdminOnly>
                          </List>
                          <NextLink href="/inventory/"><Button variant="outlined" sx={{ mt: 2 }}>Manage Inventory</Button></NextLink>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            Manage Assignments
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Create and assign tasks, complete tasks, manage projects and progress...
                          </Typography>
                          <NextLink href="/assignments/"><Button variant="outlined" sx={{ mt: 2 }}>Manage Assignments</Button></NextLink>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            Forms
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Fill out a near miss form, ShipHawk packaging adjustment, or Camp Chef Portal feature request.
                          </Typography>
                          <NextLink href="/forms/"><Button variant="outlined" sx={{ mt: 2 }}>Fill out a Form</Button></NextLink>
                        </CardContent>
                    </Card>
                </Stack>
            </Container>
            <NavBar currentPage={0} />
           </>
        )
    }
}

export async function getServerSideProps(context) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    }
  }

  return {
    props: { session }
  }
}
