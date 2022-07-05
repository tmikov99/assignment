package com.coursework.car.service;

import com.coursework.car.model.*;
import com.coursework.car.permission.ReservationPermissionService;
import com.coursework.car.permission.ReservationPermissionStore;
import com.coursework.car.repositories.OfferRepository;
import com.coursework.car.repositories.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static java.time.temporal.ChronoUnit.DAYS;

@Service
public class ReservationService {

    @Autowired
    ReservationRepository reservationRepository;

    @Autowired
    OfferRepository offerRepository;

    @Autowired
    ReservationPermissionService reservationPermissionService;

    @PreAuthorize("#userId == authentication.principal.id")
    public List<ReservationDto> getReservationByUserAndOffer(Long offerId, Long userId) {
        return reservationRepository.findByOffer_IdAndUser_Id(offerId, userId).stream().map(this::toReservationDto).collect(Collectors.toList());
    }

    @PreAuthorize("hasPermission(#offerId, 'com.coursework.car.model.Offer', 'WRITE')")
    public List<ReservationDto> getReservationByOffer(Long offerId) {
        return reservationRepository.findByOffer_Id(offerId).stream().map(this::toReservationDto).collect(Collectors.toList());
    }

    @PreAuthorize("#userId == authentication.principal.id")
    public List<ReservationDto> getReservationByUser(Long userId) {
        return reservationRepository.findByUser_Id(userId).stream().map(this::toFullReservationDto).collect(Collectors.toList());
    }

    @PreAuthorize("#reservation.user.id == authentication.principal.id")
    public void saveReservation(ReservationDto reservation) {
        Optional<Offer> savedOffer = offerRepository.findById(reservation.getOffer().getId());
        if (savedOffer.isPresent()) {
            User offerPoster = savedOffer.get().getUser();
            reservation.setApproved(false);
            reservation.setTotalCost(calculateReservationCost(savedOffer.get(), reservation));

            Reservation savedReservation = reservationRepository.save(reservation.fromDto());

            reservationPermissionService.addToStore(savedReservation.getUser(), savedReservation, "WRITE");
            reservationPermissionService.addToStore(offerPoster, savedReservation, "APPROVE");
        }
    }

    private double calculateReservationCost(Offer offer, ReservationDto reservation) {
        Instant startDate = reservation.getStartDate().toInstant();
        Instant endDate = reservation.getEndDate().toInstant();
        double pricePerDay = offer.getDayCost();
        long daysBetween = DAYS.between(startDate, endDate.plus(DAYS.getDuration()));

        return pricePerDay * daysBetween;
    }

    @PreAuthorize("hasPermission(#id, 'com.coursework.car.model.Reservation', 'APPROVE')")
    public void approveReservation(Long id, boolean isApproved) {
        Reservation reservation = reservationRepository.getReferenceById(id);
        reservation.setApproved(isApproved);
        reservationRepository.save(reservation);
    }

    @Transactional
    @PreAuthorize("hasPermission(#id, 'com.coursework.car.model.Reservation', 'WRITE')")
    public void deleteReservation(Long id) {
        Optional<Reservation> optionalReservation = reservationRepository.findById(id);
        if (!optionalReservation.isPresent()) {
            throw new RuntimeException();
        }

        reservationPermissionService.removeFromStoreByReservation(optionalReservation.get());
        reservationRepository.deleteById(id);
    }

    @Transactional
    @PreAuthorize("hasPermission(#id, 'com.coursework.car.model.Offer', 'WRITE')")
    public void deleteReservationsByOffer(Long id) {
        Optional<Offer> optionalOffer = offerRepository.findById(id);
        if (!optionalOffer.isPresent()) {
            throw new RuntimeException();
        }
        Offer offer = optionalOffer.get();
        List<Reservation> reservations = reservationRepository.findAllByOffer(offer);

        for (Reservation reservation : reservations) {
            reservationPermissionService.removeFromStoreByReservation(reservation);
        };

        reservationRepository.deleteByOffer(offer);
    }

    ReservationDto toReservationDto(Reservation reservation) {
        Offer offer = reservation.getOffer();
        User user = reservation.getUser();
        OfferDto offerDto = new OfferDto(offer.getId(), offer.getTown(), offer.getMinDays(), offer.getMaxDays(), offer.getDayCost(), null, null);
        UserDto userDto = new UserDto(user.getId(), user.getFirstName(), user.getLastName(), user.getEmail(), user.getPhoneNumber());
        return new ReservationDto(reservation.getId(), offerDto, userDto, reservation.getStartDate(), reservation.getEndDate(), reservation.getTotalCost(), reservation.isApproved());
    }

    ReservationDto toFullReservationDto(Reservation reservation) {
        Offer offer = reservation.getOffer();
        Car car = offer.getCar();
        User requester = reservation.getUser();
        User publisher = reservation.getOffer().getUser();
        UserDto publisherDto = new UserDto(publisher.getId(), publisher.getFirstName(), publisher.getLastName(), publisher.getEmail(), publisher.getPhoneNumber());
        CarDto carDto = new CarDto(car.getId(), car.getModel(), car.getFuel(), car.isAutomatic(), car.getYear(), car.getAdditionalInformation());
        OfferDto offerDto = new OfferDto(offer.getId(), offer.getTown(), offer.getMinDays(), offer.getMaxDays(), offer.getDayCost(), carDto, publisherDto);
        UserDto requesterDto = new UserDto(requester.getId(), requester.getFirstName(), requester.getLastName(), requester.getEmail(), requester.getPhoneNumber());
        return new ReservationDto(reservation.getId(), offerDto, requesterDto, reservation.getStartDate(), reservation.getEndDate(), reservation.getTotalCost(), reservation.isApproved());
    }

}
