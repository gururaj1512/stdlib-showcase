import React, { useEffect, useRef } from 'react';

const NDArrayVisualizer = ({ shape }) => {
    const canvasRef = useRef(null);
    const BG_COLOR = "#1e1b4b";
    const BLUE = "#60a5fa";
    const ORANGE = "#f97316";
    const PINK = "#ec4899";
    const RED = "#ef4444";
    const GREEN = "#10b981";
    const colors = [ORANGE, RED, GREEN, BLUE, PINK];
    const LINE_WIDTH = 2;
    const GAP = 10;
    const MATRIX_GAP_X = 15;
    const MATRIX_GAP_Y = 15;
    const ND_SHAPE_GAP = 25;
    const CELL_SIZE = 25;

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        const [width, height] = shapeSize(shape);
        canvas.width = width + 2 * GAP;
        canvas.height = height + 2 * GAP;

        clearCanvas(ctx, canvas);
        draw(ctx, shape, GAP, GAP);
    }, [shape]);

    const shapeSize = (shape) => {
        const ndims = shape.length;
        let width, height;

        if (ndims === 1) {
            width = CELL_SIZE * shape[0] + (shape[0] - 1) * GAP;
            height = CELL_SIZE;
        } else if (ndims === 2) {
            const [n_rows, n_cols] = shape;
            width = n_cols * CELL_SIZE + (shape[1] + 1) * GAP;
            height = n_rows * CELL_SIZE + (n_rows + 1) * GAP;
        } else {
            const [n_mats, n_rows, n_cols] = shape.slice(-3);
            width = n_cols * CELL_SIZE + (n_cols + 3) * GAP + (n_mats - 1) * MATRIX_GAP_X;
            height = n_rows * CELL_SIZE + (n_rows + 3) * GAP + (n_mats - 1) * MATRIX_GAP_Y;

            let horizontal = true;
            for (let i = ndims - 4; i >= 0; --i) {
                if (horizontal) {
                    width *= shape[i];
                    width += (shape[i] - 1) * ND_SHAPE_GAP;
                } else {
                    height *= shape[i];
                    height += (shape[i] - 1) * ND_SHAPE_GAP;
                }
                width += 2 * GAP;
                height += 2 * GAP;
                horizontal = !horizontal;
            }
        }
        return [width, height];
    };

    const clearCanvas = (ctx, canvas) => {
        ctx.fillStyle = BG_COLOR;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const draw = (ctx, shape, x, y) => {
        if (shape.length === 1) {
            draw1D(ctx, shape, x, y);
        } else if (shape.length === 2) {
            draw2D(ctx, shape, x, y);
        } else {
            drawND(ctx, shape, x, y);
        }
    };

    const draw1D = (ctx, shape, x, y, bgColor = BG_COLOR) => {
        const [width, height] = shapeSize(shape);
        const [len] = shape;

        ctx.fillStyle = BLUE;
        ctx.fillRect(x, y, width, height);

        let gapX = x + CELL_SIZE;
        ctx.fillStyle = bgColor;
        for (let i = 1; i < len; i++) {
            ctx.fillRect(gapX, y, GAP, CELL_SIZE);
            gapX += GAP + CELL_SIZE;
        }
    };

    const draw2D = (ctx, shape, x, y, drawWhole = true) => {
        const [width, height] = shapeSize(shape);
        const [nRows, nCols] = shape;

        ctx.fillStyle = BG_COLOR;
        ctx.fillRect(x, y, width, height);

        ctx.lineWidth = LINE_WIDTH;
        ctx.strokeStyle = PINK;
        ctx.strokeRect(x, y, width, height);

        x += GAP;
        y += GAP;

        if (drawWhole) {
            for (let i = 0; i < nRows; i++) {
                draw1D(ctx, [nCols], x, y);
                y += CELL_SIZE + GAP;
            }
        } else {
            draw1D(ctx, [nCols], x, y);
            y += CELL_SIZE + GAP;

            for (let i = 1; i < nRows; i++) {
                draw1D(ctx, [1], x, y);
                y += CELL_SIZE + GAP;
            }
        }
    };

    const draw3D = (ctx, shape, x, y) => {
        const [width, height] = shapeSize(shape);
        const [nMats, nRows, nCols] = shape;

        ctx.lineWidth = LINE_WIDTH;
        ctx.strokeStyle = ORANGE;
        ctx.strokeRect(x, y, width, height);

        const shapeEndX = x + width;
        const shapeEndY = y + height;

        x += GAP;
        y += GAP;

        for (let i = 1; i < nMats; i++) {
            draw2D(ctx, [nRows, nCols], x, y, false);
            x += MATRIX_GAP_X;
            y += MATRIX_GAP_Y;
        }

        draw2D(ctx, [nRows, nCols], x, y);
        return [shapeEndX, shapeEndY];
    };

    const drawND = (ctx, shape, x, y) => {
        const ndims = shape.length;
        if (ndims === 3) {
            return draw3D(ctx, shape, x, y);
        }

        const [width, height] = shapeSize(shape);

        ctx.strokeStyle = colors[(ndims - 3) % colors.length];
        ctx.lineWidth = LINE_WIDTH;
        ctx.strokeRect(x, y, width, height);

        const shapeEndX = x + width;
        const shapeEndY = y + height;

        x += GAP;
        y += GAP;

        const horizontal = ndims % 2 === 0;
        for (let i = 0; i < shape[0]; i++) {
            const [newX, newY] = drawND(ctx, shape.slice(1), x, y);
            if (horizontal) {
                x = newX + ND_SHAPE_GAP;
            } else {
                y = newY + ND_SHAPE_GAP;
            }
        }

        return [shapeEndX, shapeEndY];
    };

    return (
        <div className="bg-gray-900 p-4 rounded-lg">
            <canvas 
                ref={canvasRef} 
                className="bg-gray-800"
            />
        </div>
    );
};

export default NDArrayVisualizer;