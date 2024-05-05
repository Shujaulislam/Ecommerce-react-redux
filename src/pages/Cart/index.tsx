import { Link, useNavigate } from "react-router-dom";

import "../../index.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import styles from "./index.module.scss";
import Button from "../../components/components/Button";
import {
  cartReset,
  incrementItemFromCart,
  reduceItemFromCart,
  removeItemFromCart,
} from "../../features/cart/cartSlice";
import { FaShoppingCart } from "react-icons/fa";
import { MdArrowBack, MdCheck, MdDelete } from "react-icons/md";

import { TbTruckReturn } from "react-icons/tb";
import Spinner from "../../components/components/Spinner";
import { useState } from "react";


const Cart = () => {
  const [Show , setShow] =useState(false)
  const { cartItems, isLoading } = useAppSelector((state) => state.cart);
 
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (a, c) => a + c.quantity * c.product.price,
    0
  );

  if (isLoading) return <Spinner />;
const showModal = ()=>{
setShow(true)
alert("No Coupons available")
}
  return (
    <section className={styles.section}>
      <div className={`${styles.container} main-container`}>
        <div className={styles.titleContainer}>
          <Button className={styles.iconContainer} onClick={() => navigate(-1)}>
            <MdArrowBack className={styles.icon} />
          </Button>
          <div className={styles.title}>Shopping Bag</div>
        </div>
        {cartItems.length ? (
          <div className={styles.content}>
            <div className={styles.cartLeft} >
              <div
                className={styles.emptyCart}
                onClick={() => dispatch(cartReset())}
              >
                Empty Cart
              </div>
              {cartItems.map((item ,index) => {
                return (
                  <div className={styles.cartCardWrapper} key={index}>
                    <Link
                      to={`/products/${item.product.id}`}
                      className={styles.cartCardContainer}
                    >
                      <img
                        src={item.product.image}
                        className={styles.cartCardImage}
                        alt={item.product.title}
                      />
                      <div className={styles.cartCardDetails}>
                        <div className={styles.cartCardLeft}>
                          <div className={styles.title}>
                            {item.product.title}
                          </div>
                          <div className={styles.size}>Size: 36</div>
                          <div className={styles.price}>
                            $ {item.product.price}
                          </div>
                          <div className={styles.return}>
                            <div className={styles.iconContainer}>
                              <TbTruckReturn className={styles.icon} />
                            </div>
                            <div className={styles.title}>
                              14 days return available
                            </div>
                          </div>
                          <div className={styles.delivery}>
                            <div className={styles.iconContainer}>
                              <MdCheck className={styles.icon} />
                            </div>
                            <div className={styles.title}>
                              Delivery by 2 days
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                    <div className={styles.cartCardRight}>
                      <div className={styles.cartCardRightWrapper}>
                        <Button
                          className={styles.button}
                          onClick={() =>
                            dispatch(reduceItemFromCart(item.product))
                          }
                        >
                          -
                        </Button>
                        <div className={styles.counter}>{item.quantity}</div>
                        <Button
                          className={styles.button}
                          onClick={() =>
                            dispatch(incrementItemFromCart(item.product))
                          }
                        >
                          +
                        </Button>
                      </div>
                      <Button
                        className={styles.cartCardDelete}
                        onClick={() =>
                          dispatch(removeItemFromCart(item.product.id))
                        }
                      >
                        <MdDelete className={styles.icon} />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className={styles.cartRight}>
              <div className={styles.coupon}>
                <div className={styles.title}>Coupons</div>
                <div className={styles.couponContent}>
                 <div>
                  <button className=" text-3xl px-3 py-1 border-2 rounded-2xl bg-white border-gray-600" onClick={showModal}>Show Coupons</button>
                  </div>
                  
                </div>
              </div>
              <div className={styles.priceDetails}>
                <div className={styles.title}>Price Details</div>
                <div className={styles.priceContent}>
                  <div className={styles.title}>Total MRP</div>
                  <div className={styles.price}>{totalPrice.toFixed(2)}</div>
                </div>
                <div className={styles.priceContent}>
                  <div className={styles.title}>Platform Fee</div>
                  <div className={styles.price}>FREE</div>
                </div>
                <div className={styles.priceContent}>
                  <div className={styles.title}>Shipping Fee</div>
                  <div className={styles.price}>FREE</div>
                </div>
              </div>
              <div className={styles.totalContent}>
                <div className={styles.title}>Total Amount</div>
                <div className={styles.price}>{totalPrice.toFixed(2)}</div>
              </div>
              <Button className={styles.button}>Place Order</Button>
            </div>
          </div>
        ) : (
          <>
            <div className="shopping">
              <FaShoppingCart />
            </div>
            <div>
              <p className="shopping-text">
                No items here please go to shopping
              </p>
              <a href="/catalog/All" className="shop-button">
                <button>Go to Shopping</button>
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Cart;
