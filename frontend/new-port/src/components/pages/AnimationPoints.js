import React, { useRef, useEffect, useState, useCallback } from "react";
// import { useLocation } from "react-router-dom";

const Canvas = () => {
  const canvasRef = useRef(null);
  const points = useRef([]);
  const intervalRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [widthSize, setWidthSize] = useState(window.innerWidth);
  // const location = useLocation();
  const [pointCount, setPointCount] = useState(300);
  const [heightSize, setHeightSize] = useState(
    document.documentElement.scrollHeight
  );

  // let pointCount = 300;

  // 初期化とアニメーションループの設定
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const interval = 1000 / 60; // 60 FPS

    // キャンバスの幅と高さを設定
    canvas.width = widthSize;
    canvas.height = heightSize;

    // 点の初期化
    const initPoints = () => {
      points.current = [];
      for (let i = 0; i < pointCount; i++) {
        points.current.push({
          x: Math.random() * widthSize,
          y: Math.random() * heightSize,
          dx: (Math.random() - 0.5) * 2, // スピードを調整
          dy: (Math.random() - 0.5) * 2, // スピードを調整
          originalDx: 0,
          originalDy: 0,
        });
      }
    };

    // アニメーションの描画
    const update = () => {
      ctx.clearRect(0, 0, widthSize, heightSize);

      // 線の描画
      ctx.strokeStyle = "rgba(255,255,255,0.8)";
      ctx.lineWidth = 0.3;
      ctx.beginPath();
      for (let i = 0; i < points.current.length; i++) {
        const point1 = points.current[i];
        for (let j = i + 1; j < points.current.length; j++) {
          const point2 = points.current[j];
          const distance = Math.sqrt(
            (point1.x - point2.x) ** 2 + (point1.y - point2.y) ** 2
          );
          if (distance < 110) {
            ctx.moveTo(point1.x, point1.y);
            ctx.lineTo(point2.x, point2.y);
          }
        }
      }
      ctx.stroke();

      // 点の描画
      points.current.forEach((point) => {
        point.x += point.dx;
        point.y += point.dy;

        // 境界での反射
        if (point.x < 0 || point.x > widthSize) point.dx *= -1;
        if (point.y < 0 || point.y > heightSize) point.dy *= -1;

        // 点の描画
        ctx.beginPath();
        ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(155,255,255,0.8)";
        ctx.fill();
      });
    };

    initPoints();
    intervalRef.current = setInterval(update, interval);

    // クリーンアップ
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [widthSize, heightSize, pointCount]);

  const handleResizeHome = useCallback(() => {
    const newWidthSize = window.innerWidth;
    const newHeightSize = document.documentElement.scrollHeight;

    setPointCount(300);
    setWidthSize(newWidthSize);
    setHeightSize(newHeightSize);
  }, []);

  // const handleResizeForm = useCallback(() => {
  //   const newWidthSize = window.innerWidth;
  //   const newHeightSize = window.innerHeight;

  //   setPointCount(50);
  //   setWidthSize(newWidthSize);
  //   setHeightSize(newHeightSize);
  // }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResizeHome);

    // 初期サイズ設定
    handleResizeHome();

    return () => {
      window.removeEventListener("resize", handleResizeHome);
    };
  }, [handleResizeHome]);

  // useEffect(() => {
  //   const updateSize = () => {
  //     // const isFormPage = location.pathname === "/form";

  //     if (isFormPage) {
  //       handleResizeForm();
  //     } else {
  //       setTimeout(() => {
  //         handleResizeHome();
  //       }, 0);
  //     }
  //   };

  // ページが変更されたときにリサイズ処理を実行
  // updateSize();

  // 依存関係に location を含める
  // }, [location, handleResizeForm, handleResizeHome]);

  // マウス位置に基づいて点の動きを調整
  useEffect(() => {
    const adjustPointsBasedOnMouse = () => {
      if (!points.current) return;

      points.current.forEach((point) => {
        const distanceX = mousePosition.x - point.x;
        const distanceY = mousePosition.y - point.y;
        const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
        if (!point.originalDx && !point.originalDy) {
          point.originalDx = point.dx;
          point.originalDy = point.dy;
        }

        // 点がマウスに近い場合、速度を変更
        if (distance < 120) {
          const angle = Math.atan2(distanceY, distanceX);

          // 速度を調整
          point.dx -= Math.cos(angle) * 0.3;
          point.dy -= Math.sin(angle) * 0.3;
        } else if (distance > 120) {
          // 点がマウスから離れた場合、速度を元に戻す
          point.dx = point.originalDx;
          point.dy = point.originalDy;

          // 元の速度がランダムで再設定されることを防ぐ
          point.originalDx = 0;
          point.originalDy = 0;
        }
      });
    };

    adjustPointsBasedOnMouse();
  }, [mousePosition]);

  // マウスの動きを監視
  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.pageX, y: event.pageY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ display: "block" }} />;
};

export default Canvas;
