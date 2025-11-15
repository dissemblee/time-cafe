'use client'
import { useGetAllRoomsQuery } from "@/entities/room";
import { GlassCard } from "@/shared/ui/GlassCard/GlassCard"
import { LiquidButton } from "@/shared/ui/LiquidButton";
import Link from "next/link";
import styles from "./RoomList.module.scss"
import { Loader } from "@/shared/ui/Loader";
import { Error } from "@/shared/ui/Error";

export const RoomList = () => {
  const { data: roomsData, isLoading, error } = useGetAllRoomsQuery();
  
  if (isLoading) return <Loader />;
  if (error) return <Error />;

  return (
    <section className={styles.RoomsPage__grid}>
      {roomsData?.data?.map((room, index) => (
        <GlassCard key={index} className={styles.RoomsPage__card}>
          <div className={styles.RoomsPage__cardContent}>
            <h3 className={styles.RoomsPage__roomName}>{room.name} ({room.type})</h3>
            <p className={styles.RoomsPage__roomDescription}>{room.description}</p>
            <span className={styles.RoomsPage__detail}>Курение: {room.smoking_allowed ? 'Разрешено' : 'Запрещено'}</span>
            <span className={styles.RoomsPage__detail}>Цена: {room.min_price}₽/час</span>
            <div className={styles.RoomsPage__features}>
              {room.features.map((feature, featureIndex) => (
                <span key={featureIndex} className={styles.RoomsPage__feature}>
                  {feature}
                </span>
              ))}
            </div>
            
            <Link href={"/booking"}>
              <LiquidButton 
                variant="primary" 
                className={styles.RoomsPage__bookButton}
              >
                Забронировать
              </LiquidButton>
            </Link>
          </div>
        </GlassCard>
      ))}
    </section>
  )
}