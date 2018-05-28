import styled, { css } from "styled-components";

export default styled.div`
	h2 {
		text-align: center;
		margin-bottom: 20px;
	}

	h2.current {
		margin-top: 70px;
	}

	.current-price {
		display: flex;
		justify-content: center;

		& div {
			margin: 0 5px;

			& td:nth-child(2) {
				text-align: right;
			}
		}
	}

	.converter {
		display: flex;
		justify-content: center;

		& > div {
			margin: 5px;
		}

		& > div:not(:nth-child(3)) {
			width: 150px;
		}

		& > div:not(:nth-child(3)) > * {
			margin-bottom: 10px;
		}

		& .converter-button {
			margin-top: 35px;
		}

		& p {
			color: #555;
			margin-left: 16px;
		}
	}

	.static-chart {
		display: flex;
		justify-content: center;

			& select {
				width: 150px;
			}
	}

	@media screen and (max-width: 480px) {
		h2 {
			font-size: 22px;
			margin-bottom: 10px;
		}

		.current-price {
			flex-direction: column;
			align-items: center;

			& div:nth-child(1) {
				margin-bottom: 10px;
			}
		}

		.converter {
			flex-direction: column;
			align-items: center;

			& .converter-button {
				margin-top: 0;
			}
		}
	}
`;
