import React from 'react'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import StackedLineChartOutlinedIcon from '@mui/icons-material/StackedLineChartOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import AdfScannerOutlinedIcon from '@mui/icons-material/AdfScannerOutlined';
import FactoryOutlinedIcon from '@mui/icons-material/FactoryOutlined';

export const SidebarData = [
  {
    title: 'Home',
    icon: <HomeOutlinedIcon />,
    link: '/'
  },
  {
    title: 'DashBoard',
    icon: <SpaceDashboardOutlinedIcon />,
    link: '/dashboard'
  },

  {
    title: 'Maps',
    icon: <LocationOnOutlinedIcon />,
    link: '/maps'
  },
  {
    title: 'Alarm',
    icon: <WarningAmberOutlinedIcon />,
    link: '/alarm'
  },
  {
    title: 'Reports',
    icon: <AdfScannerOutlinedIcon />,
    link: '/report'
  },
]

