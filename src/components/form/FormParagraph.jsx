import React from 'react';
import { CardHeader, Card, CardContent, CardActions, CircularProgress, Divider } from '@mui/material';
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
	// RENDER
	return (
		<Card sx={cssRoot} id={id}>
			<CardHeader title={title} />

			<CardContent sx={haveExpand ? cssContent : null}>
				{bodyBusy
					? <Skeleton animation="wave" variant="rectangular" height={200} />
					: children
				}
			</CardContent>
			{renderFooter && (<>
				<Divider sx={cssDivider} />
				<CardActions sx={cssActions}>
					{footerBusy
						? <CircularProgress size={36} sx={cssProgress} />
						: renderFooter
					}
				</CardActions>
			</>)}
		</Card>
	);
}


const cssRoot = theme => ({
	padding: "9px 16px 16px 16px",
	marginTop: theme.spacing(3),
	marginBottom: theme.spacing(3),
	width: "100%",
})
const cssContent = theme => ({
	paddingBottom: "0px!important"
})
const cssActions = theme => ({
	//marginTop: "10px",
	padding: "16px",
})
const cssProgress = theme => ({
	marginLeft: "8px",
})
const cssDivider = theme => ({
	margin: "9px -17px;",
})
