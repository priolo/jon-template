import React from 'react';
import { CardHeader, Card, CardContent, CardActions, CircularProgress, Divider } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Skeleton } from '@mui/material';


export default function FormParagraph({
	id,
	title,
	children,
	renderFooter,
	footerBusy,
	bodyBusy,
	haveExpand,
}) {

	// HOOKs
	const classes = useStyles();


	// RENDER
	return (
		<Card className={classes.root} id={id}>
			<CardHeader title={title} />

			<CardContent className={haveExpand ? classes.content : null}>
				{bodyBusy
					? <Skeleton animation="wave" variant="rectangular" height={200} />
					: children
				}
			</CardContent>
			{renderFooter && (<>
				<Divider className={classes.divider} />
				<CardActions className={classes.actions}>
					{footerBusy
						? <CircularProgress size={36} className={classes.progress} />
						: renderFooter
					}
				</CardActions>
			</>)}
		</Card>
	);
}


const useStyles = makeStyles((theme) => ({
	root: {
		padding: "9px 16px 16px 16px",
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3),
		width: "100%",
	},
	content: {
		paddingBottom: "0px!important"
	},
	actions: {
		//marginTop: "10px",
		padding: "16px",
	},
	progress: {
		marginLeft: "8px",
	},
	divider: {
		margin: "9px -17px;",
	}
}));