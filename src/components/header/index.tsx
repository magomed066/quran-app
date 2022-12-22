import { styled, alpha } from '@mui/material/styles'
import { AppBar, Box, Toolbar, IconButton, InputBase } from '@mui/material'
import {
	Menu as MenuIcon,
	Search as SearchIcon,
	Settings as SettingsIcon,
} from '@mui/icons-material'

import Logo from '../../assets/images/icons8-quran-64.png'

const Header = () => {
	return (
		<Box sx={{ flexGrow: 1, marginBottom: '20px' }}>
			<AppBar position="static" style={{ background: '#279e8b' }}>
				<Toolbar>
					<ImageWrapper>
						<img src={Logo} alt="Logo" />
					</ImageWrapper>

					<BurgerWrapper>
						<IconButton
							size="large"
							edge="start"
							color="inherit"
							aria-label="menu"
							sx={{ mr: 2 }}
						>
							<MenuIcon />
						</IconButton>
					</BurgerWrapper>

					<Search>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase
							placeholder="Search…"
							inputProps={{ 'aria-label': 'search' }}
						/>
					</Search>

					<MenuWrapper>
						<IconButton>
							<SettingsIcon />
						</IconButton>
					</MenuWrapper>
				</Toolbar>
			</AppBar>
		</Box>
	)
}

const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(1),
		width: 'auto',
	},
	[theme.breakpoints.down('sm')]: {
		display: 'none',
	},
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}))

const ImageWrapper = styled('div')(({ theme }) => ({
	marginRight: 40,
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: '12ch',
			'&:focus': {
				width: '20ch',
			},
		},
	},
}))

const MenuWrapper = styled('div')(({ theme }) => ({
	marginLeft: 'auto',
	color: '#fff',
}))

const BurgerWrapper = styled('div')(({ theme }) => ({
	display: 'none',
	[theme.breakpoints.down('sm')]: {
		display: 'block',
	},
}))

export default Header
