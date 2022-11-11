const Order = require("../model/orderModel");

exports.getAllOrder = async (req, res, next) => {
  try {
    const orders = await Order.find();

    if (orders.length === 0) {
      return res.status(200).json({
        status: "success",
        message: "No order",
      });
    }

    res.status(200).json({
      status: "success",
      results: orders.length,
      data: {
        orders,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createOrder = async (req, res, next) => {
  try {
    const { name, quantity, date } = req.body;
    const order = await Order.create({
      name,
      quantity,
      date,
    });

    res.status(201).json({
      status: "success",
      data: {
        order,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!order) {
      return res.status(404).json({
        status: "fail",
        message: "Please fill your order to update",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        order,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({
        status: "fail",
        message: "Please fill your order to delete",
      });
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.orderReport = async (req, res, next) => {
  try {
    const report = await Order.aggregate([
      {
        $group: {
          _id: "$date",
          numOrder: { $sum: "$quantity" },
          avgOrder: { $avg: "$quantity" },
        },
      },
      {
        $sort: {
          _id: -1,
          avgOrder: -1,
        },
      },
    ]);

    res.status(200).json({
      status: "success",
      data: {
        report,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
